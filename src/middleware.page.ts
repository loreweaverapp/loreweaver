import {authMiddleware} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {afterAuthSections} from "./middleware/afterAuth";
import {matchSection} from "./middleware/matchSection";
import {type AfterAuthResult} from "./middleware";

export default authMiddleware({
    publicRoutes: ["/", "/welcome", "/finish-sign-up"],
    debug: true,
    clockSkewInSeconds: 60,
    async afterAuth(auth, req, evt) {
        // Try each section one by one starting at the top.
        // If any of the sections produce a result, return it, and skip the rest of the sections.
        // If none of the sections produce a result (aka all return undefined, or none are checked to begin with),
        //   then return NextResponse.next().
        const result = await afterAuthSections.reduce(
            async (prevResult, {route, handler}) => {
                const prevResultResolved = await prevResult;
                if (prevResultResolved || !matchSection(req, route)) {
                    return prevResultResolved;
                }

                return handler(auth, req, evt);
            },
            undefined as AfterAuthResult,
        );

        return result ?? NextResponse.next();
    },
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
