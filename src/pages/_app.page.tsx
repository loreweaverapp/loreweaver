import {type AppProps} from "next/app";
import {MantineProvider} from "@mantine/core";
import {ClerkProvider} from "@clerk/nextjs";
import {Poppins} from "next/font/google";
import {NextSeo} from "next-seo";
import {api} from "$/trpc/client";
import {emotionCache} from "../styles/emotionCache";

const sansFont = Poppins({
    subsets: ["latin"],
    display: "swap",
    style: ["normal", "italic"],
    weight: ["400", "700"],
    variable: "--font-sans",
});

function CustomApp(appProps: AppProps) {
    const {Component, pageProps} = appProps;

    return (
        <MantineProvider
            emotionCache={emotionCache}
            withNormalizeCSS
            withCSSVariables
            withGlobalStyles
            theme={{
                colorScheme: "dark",
                respectReducedMotion: true,
                defaultRadius: "md",
                primaryColor: "grape",
                globalStyles: () => ({
                    body: {
                        ...sansFont.style,
                    },
                }),
                components: {
                    Button: {
                        styles: () => ({
                            label: {
                                textTransform: "capitalize",
                            },
                        }),
                    },
                },
            }}
        >
            <ClerkProvider {...pageProps}>
                <NextSeo
                    additionalMetaTags={[
                        {
                            name: "viewport",
                            content: "width=device-width, initial-scale=1.0",
                        },
                    ]}
                />
                <Component {...pageProps} />
            </ClerkProvider>
        </MantineProvider>
    );
}

export default api.withTRPC(CustomApp);
