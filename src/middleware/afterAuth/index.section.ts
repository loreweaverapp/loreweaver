import {NextResponse} from "next/server";
import {type AfterAuthMiddlewareSection} from "../index";

export const indexSection: AfterAuthMiddlewareSection = {
    route: /^\/$/,
    handler: async (auth, req) => {
        if (auth.user) {
            return NextResponse.redirect(new URL("/studio", req.url));
        }

        return NextResponse.redirect(new URL("/welcome", req.url));
    },
};
