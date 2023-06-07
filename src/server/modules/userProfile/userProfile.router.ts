import {createTRPCRouter} from "../../api/trpc";
import {
    createUserProfile,
    deleteUserProfile,
    getUserProfile,
    updateUserProfile,
} from "./userProfile.procedures";

export const userProfileRouter = createTRPCRouter({
    create: createUserProfile,
    get: getUserProfile,
    update: updateUserProfile,
    delete: deleteUserProfile,
});
