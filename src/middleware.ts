import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware();

// For now, the entire application is auth protected
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
