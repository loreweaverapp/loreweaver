"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@clerk/nextjs";
import {api} from "$/trpc/client";

const formSchema = z.object({
    displayName: z.string().max(64).optional(),
    bio: z.string().max(256).optional(),
});

export function FinishSignUpForm() {
    const {handleSubmit, register} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            bio: "",
        },
    });

    const {mutate} = api.userProfile.update.useMutation();

    const {userId} = useAuth();
    if (!userId) {
        return null;
    }

    return (
        <form
            onSubmit={handleSubmit((values) =>
                mutate({
                    userProfile: {userId},
                    data: {
                        ...values,
                    },
                }),
            )}
        >
            <h1>Setup Your Profile</h1>
            <h2>
                You can always customize your profile later if you want to skip
                this step now.
            </h2>
            <input
                placeholder="(Optional) Enter your display name"
                {...register("displayName", {max: 64, required: false})}
            />
            <textarea
                placeholder="(Optional) Write a bit about yourself..."
                {...register("bio", {max: 256, required: false})}
            />
            <button type="submit">Confirm</button>
            <button type="button">Continue to site (skip)</button>
        </form>
    );
}
