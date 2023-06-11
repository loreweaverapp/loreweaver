import {TRPCError} from "@trpc/server";
import clerk from "@clerk/clerk-sdk-node";
import {protectedProcedure, publicProcedure} from "../../api/trpc";
import {prisma} from "../../db";
import {
    createUserProfileSchema,
    findUserProfileByIdSchema,
    findUserProfileSchema,
    updateUserProfileSchema,
} from "./userProfile.schemas";

export const createUserProfile = protectedProcedure
    .input(createUserProfileSchema)
    .mutation(async ({input, ctx}) => {
        if (input.userId !== ctx.auth.userId) {
            throw new TRPCError({code: "FORBIDDEN"});
        }

        const {hasProfile} = ctx.auth.user!.privateMetadata;
        if (hasProfile) {
            throw new TRPCError({code: "BAD_REQUEST"});
        }

        return prisma.$transaction(async (tx) => {
            const userProfile = await tx.userProfile.create({data: input});
            await clerk.users.updateUserMetadata(userProfile.userId, {
                privateMetadata: {
                    hasProfile: true,
                },
            });
            return userProfile;
        });
    });

export const getUserProfile = publicProcedure
    .input(findUserProfileSchema)
    .mutation(async ({input, ctx}) => {
        const userProfile = await prisma.userProfile.findUnique({where: input});

        return userProfile;
    });

export const updateUserProfile = protectedProcedure
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
    });

export const deleteUserProfile = protectedProcedure
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
    });
