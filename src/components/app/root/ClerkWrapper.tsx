import {type PropsWithChildren} from "react";
import {ClerkProvider} from "@clerk/nextjs";
import {type AppProps} from "next/app";
import {type AppPageProps} from "$/pages/_app.page";

export function ClerkWrapper({
    children,
    pageProps,
}: PropsWithChildren<Pick<AppProps<AppPageProps>, "pageProps">>) {
    return <ClerkProvider {...pageProps}>{children}</ClerkProvider>;
}
