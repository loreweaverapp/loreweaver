import {TRPCError} from "@trpc/server";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "../../api/trpc";
import {prisma} from "../../db";
import {
    createUserProfileSchema,
    findUserProfileByIdSchema,
    findUserProfileSchema,
    updateUserProfileSchema,
} from "./userProfile.schemas";

export const userProfileRouter = createTRPCRouter({
    create: protectedProcedure
        .input(createUserProfileSchema)
        .mutation(async ({input, ctx}) => {
            if (input.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }

            return prisma.userProfile.create({data: input});
        }),

    get: publicProcedure
        .input(findUserProfileSchema)
        .query(async ({input, ctx}) => {
            const userProfile = await prisma.userProfile.findUnique({
                where: input,
            });

            // If a user profile is private, only the owner can view it
            // TODO: Also allow friends/followers to view private profiles
            if (
                userProfile &&
                userProfile.userId !== ctx.auth.userId &&
                userProfile.private
            ) {
                throw new TRPCError({code: "FORBIDDEN"});
            }

            return userProfile;
        }),

    update: protectedProcedure
        .input(updateUserProfileSchema)
        .mutation(async ({input, ctx}) => {
            const userProfile = await prisma.userProfile.findUnique({
                where: input.userProfile,
            });

            if (!userProfile) {
                throw new TRPCError({code: "NOT_FOUND"});
            }

            if (userProfile.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }

            return prisma.userProfile.update({
                where: input.userProfile,
                data: input.data,
            });
        }),

    delete: protectedProcedure
        .input(findUserProfileByIdSchema)
        .mutation(async ({input, ctx}) => {
            const userProfile = await prisma.userProfile.findUnique({
                where: {id: input.id},
            });

            if (!userProfile) {
                throw new TRPCError({code: "NOT_FOUND"});
            }

            if (userProfile?.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }

            return prisma.userProfile.delete({where: input});
        }),
});
