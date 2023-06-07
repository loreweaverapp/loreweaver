import {z} from "zod";
import {UserRole} from "@prisma/client";
import {generateUuid} from "../../lib/uuid";
import {generateDate} from "../../lib/date";

export const createUserProfileSchema = z.object({
    id: z.string().uuid().default(generateUuid),
    userId: z.string(),
    updatedAt: z.date().default(generateDate),
    role: z.nativeEnum(UserRole).default(UserRole.USER),
    displayName: z.string().optional(),
    bio: z.string().optional(),
    status: z.string().optional(),
});

export const findUniqueUserProfileSchema = z.union([
    z.object({
        id: z.string().uuid(),
    }),
    z.object({
        userId: z.string(),
    }),
]);
