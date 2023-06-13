import {type NextMiddlewareResult} from "@clerk/nextjs/dist/types/server/types";
import {type AuthObject} from "@clerk/backend";
import {type NextFetchEvent, type NextRequest} from "next/server";

export type AfterAuthResult =
    | NextMiddlewareResult
    | Promise<NextMiddlewareResult>
    | undefined
    | Promise<undefined>;

export type AfterAuthHandler = (
    auth: AuthObject & {
        isPublicRoute: boolean;
    },
    req: NextRequest,
    evt: NextFetchEvent,
) => AfterAuthResult;

export type RouteMatcher = string | RegExp | ((req: NextRequest) => boolean);

export type AfterAuthMiddlewareSection = {
    route: RouteMatcher;
    handler: AfterAuthHandler;
};
