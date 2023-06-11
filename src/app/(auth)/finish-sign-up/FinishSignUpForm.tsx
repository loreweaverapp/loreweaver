"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@clerk/nextjs";
import {trpc} from "$/lib/trpc";

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

    const {userId} = useAuth();

    const {mutate} = trpc.userProfile.update.useMutation();

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
            <input
                placeholder="Enter your display name"
                {...register("displayName", {max: 64, required: false})}
            />
            <textarea
                placeholder="Tell the world a bit about yourself"
                {...register("bio", {max: 256, required: false})}
            />
        </form>
    );
}
