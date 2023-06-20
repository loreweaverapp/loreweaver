import {NextResponse} from "next/server";
import {type AfterAuthMiddlewareSection} from "../index";

export const indexSection: AfterAuthMiddlewareSection = {
    debugName: "index -> /welcome or /studio",
    route: /^\/$/,
    handler: async (auth, req) => {
        if (auth.userId) {
            console.log("Logged in, redirecting to /studio");
            return NextResponse.redirect(new URL("/studio", req.url));
        }

        console.log("Not logged in, redirecting to /welcome");
        return NextResponse.redirect(new URL("/welcome", req.url));
    },
};
