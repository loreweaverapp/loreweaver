import {type AppProps} from "next/app";
import {api} from "$/trpc/client";
import "$/styles/globals.css";
import {StylesWrapper} from "../components/app/root/StylesWrapper";
import {ClerkWrapper} from "../components/app/root/ClerkWrapper";

export type AppPageProps = any;

function CustomApp(appProps: AppProps<AppPageProps>) {
    const {Component, pageProps} = appProps;

    return (
        <ClerkWrapper pageProps={pageProps}>
            <StylesWrapper>
                <Component {...pageProps} />
            </StylesWrapper>
        </ClerkWrapper>
    );
}

export default api.withTRPC(CustomApp);
