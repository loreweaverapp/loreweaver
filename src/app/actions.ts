"use server";

import {createAction} from "$/server/api/trpc";
import * as userProfile from "$/server/modules/userProfile/userProfile.procedures";

export const createUserProfile = createAction(userProfile.createUserProfile);
export const getUserProfile = createAction(userProfile.getUserProfile);
export const updateUserProfile = createAction(userProfile.updateUserProfile);
export const deleteUserProfile = createAction(userProfile.deleteUserProfile);
