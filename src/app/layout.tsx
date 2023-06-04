import "$/styles/globals.css";
import {Lato} from "next/font/google";
import {twMerge} from "tailwind-merge";
import {ClerkProvider} from "@clerk/nextjs";

const lato = Lato({
    subsets: ["latin-ext"],
    display: "swap",
    style: "normal",
    weight: ["400", "700"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Create T3 App",
    description: "Generated by create-t3-app",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={twMerge(
                        "bg-background font-sans text-foreground",
                        lato.variable,
                    )}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
