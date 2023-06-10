import {TRPCError} from "@trpc/server";
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

        return prisma.userProfile.create({data: input});
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
