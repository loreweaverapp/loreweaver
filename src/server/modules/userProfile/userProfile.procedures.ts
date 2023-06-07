import {z} from "zod";
import {TRPCError} from "@trpc/server";
import {protectedProcedure, publicProcedure} from "../../api/trpc";
import {prisma} from "../../db";
import {
    createUserProfileSchema,
    findUniqueUserProfileSchema,
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
    .input(findUniqueUserProfileSchema)
    .mutation(async ({input, ctx}) => {
        const userProfile = await prisma.userProfile.findUnique({where: input});

        if (!userProfile && "userId" in input) {
            if (input.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }

            return prisma.userProfile.create({
                data: createUserProfileSchema.parse(input),
            });
        }

        return userProfile;
    });

export const updateUserProfile = protectedProcedure
    .input(
        z.object({
            userProfile: findUniqueUserProfileSchema,
            data: createUserProfileSchema.partial(),
        }),
    )
    .mutation(async ({input, ctx}) => {
        if ("id" in input.userProfile) {
            const userProfile = await prisma.userProfile.findUnique({
                where: {id: input.userProfile.id},
            });

            if (!userProfile) {
                throw new TRPCError({code: "NOT_FOUND"});
            }

            if (userProfile?.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }
        }

        if ("userId" in input.userProfile) {
            if (input.userProfile.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }

            const userProfile = await prisma.userProfile.findUnique({
                where: {userId: input.userProfile.userId},
            });

            if (!userProfile) {
                await prisma.userProfile.create({
                    data: createUserProfileSchema.parse(input),
                });
            }
        }

        return prisma.userProfile.update({
            where: input.userProfile,
            data: input.data,
        });
    });

export const deleteUserProfile = protectedProcedure
    .input(findUniqueUserProfileSchema)
    .mutation(async ({input, ctx}) => {
        if ("id" in input) {
            const userProfile = await prisma.userProfile.findUnique({
                where: {id: input.id},
            });

            if (!userProfile) {
                throw new TRPCError({code: "NOT_FOUND"});
            }

            if (userProfile?.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }
        }

        if ("userId" in input) {
            if (input.userId !== ctx.auth.userId) {
                throw new TRPCError({code: "FORBIDDEN"});
            }
        }

        return prisma.userProfile.delete({where: input});
    });
