import {z} from "zod";
import {UserRole} from "@prisma/client";
import {generateUuid} from "../../lib/uuid";
import {generateDate} from "../../lib/date";

export const createUserProfileSchema = z.object({
    id: z.string().uuid().default(generateUuid),
    userId: z.string(),
    username: z.string(),
    updatedAt: z.date().default(generateDate),
    role: z.nativeEnum(UserRole).default(UserRole.USER),
    displayName: z.string().optional(),
    bio: z.string().optional(),
    status: z.string().optional(),
});

export const findUserProfileByIdSchema = z.object({
    id: z.string().uuid(),
});

export const findUserProfileByUserIdSchema = z.object({
    userId: z.string(),
});

export const findUserProfileByUsernameSchema = z.object({
    username: z.string(),
});

export const findUserProfileSchema = z.union([
    findUserProfileByIdSchema,
    findUserProfileByUserIdSchema,
    findUserProfileByUsernameSchema,
]);

export const updateUserProfileSchema = z.object({
    userProfile: findUserProfileSchema,
    data: createUserProfileSchema.partial(),
});
