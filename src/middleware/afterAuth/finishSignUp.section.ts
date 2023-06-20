import {NextResponse} from "next/server";
import {prisma} from "$/server/db";
import {generateUuid} from "$/server/lib/uuid";
import {generateDate} from "$/server/lib/date";
import {type AfterAuthMiddlewareSection} from "..";

export const finishSignUpSection: AfterAuthMiddlewareSection = {
    debugName: "protect finish-sign-up",
    route: "/finish-sign-up",
    handler: async (auth, req) => {
        const {user} = auth;

        if (!user || !user.username) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        const existingProfile = await prisma.userProfile.findUnique({
            where: {
                userId: user.id,
            },
        });

        if (!existingProfile) {
            await prisma.userProfile.create({
                data: {
                    id: generateUuid(),
                    updatedAt: generateDate(),
                    userId: user.id,
                    username: user.username,
                },
            });
        }

        return NextResponse.redirect(new URL("/", req.url));
    },
};
