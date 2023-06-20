import Document, {type DocumentContext} from "next/document";
import {ServerStyles} from "@mantine/next";
import {emotionStylesServer} from "$/styles/emotionCache";

export default class _Document extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <ServerStyles
                    html={initialProps.html}
                    server={emotionStylesServer}
                    key="styles"
                />,
            ],
        };
    }
}
