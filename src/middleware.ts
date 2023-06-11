import {authMiddleware} from "@clerk/nextjs";
import {type NextFetchEvent, type NextRequest, NextResponse} from "next/server";
import {type AuthObject} from "@clerk/backend";
import {type NextMiddlewareResult} from "@clerk/nextjs/dist/types/server/types";
import {api} from "$/trpc/server";

type AfterAuthResult =
    | NextMiddlewareResult
    | Promise<NextMiddlewareResult>
    | undefined
    | Promise<undefined>;

type AfterAuthHandler = (
    auth: AuthObject & {
        isPublicRoute: boolean;
    },
    req: NextRequest,
    evt: NextFetchEvent,
) => AfterAuthResult;

type AfterAuthMiddlewareSection = {
    route: string | ((req: NextRequest) => boolean);
    handler: AfterAuthHandler;
};

const afterAuthSections: AfterAuthMiddlewareSection[] = [
    {
        route: "/finish-sign-up",
        handler: async (auth, req) => {
            const {user} = auth;

            if (!user || user.privateMetadata.profileInitialized === true) {
                return NextResponse.rewrite(new URL("/", req.nextUrl.basePath));
            }

            await api.userProfile.create.mutate({
                userId: user.id,
                username: user.username!,
            });

            return undefined;
        },
    },
];

export default authMiddleware({
    publicRoutes: ["/finish-sign-up"],
    async afterAuth(auth, req, evt) {
        let result: AfterAuthResult;
        afterAuthSections.map(async (section) => {
            if (result) {
                return;
            }

            result = await section.handler(auth, req, evt);
        });

        return result ?? NextResponse.next();
    },
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
