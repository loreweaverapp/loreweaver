import {type NextRequest} from "next/server";
import {type RouteMatcher} from ".";

export function matchSection(request: NextRequest, route: RouteMatcher) {
    const {pathname} = request.nextUrl;

    if (typeof route === "string") {
        return pathname.startsWith(route);
    }

    if (typeof route === "function") {
        return route(request);
    }

    return route.test(pathname);
}
