import {type PropsWithChildren} from "react";

export default function AuthLayout({children}: PropsWithChildren) {
    return (
        <main className="al flex h-screen w-screen items-center justify-center">
            {children}
        </main>
    );
}
