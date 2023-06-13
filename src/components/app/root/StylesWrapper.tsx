import {type PropsWithChildren} from "react";
import {Poppins} from "next/font/google";
import {cn} from "$/lib/cn";

const sansFont = Poppins({
    subsets: ["latin"],
    display: "swap",
    style: ["normal", "italic"],
    weight: ["400", "700"],
    variable: "--font-sans",
});

export function StylesWrapper({children}: PropsWithChildren) {
    return (
        <div
            className={cn(
                "min-h-screen bg-background font-sans text-foreground subpixel-antialiased",
                sansFont.variable,
            )}
        >
            {children}
        </div>
    );
}
