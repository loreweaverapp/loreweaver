"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@clerk/nextjs";
import {api} from "../../../trpc/client";
import {trpc} from "../../../lib/trpc";

const formSchema = z.object({
    displayName: z.string().max(64).optional(),
    bio: z.string().max(256).optional(),
});

export function FinishSignUpForm() {
    const {handleSubmit} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            bio: "",
        },
    });

    const {userId} = useAuth();

    const mutation = trpc.useMutation();

    return (
        <form
            action={() =>
                handleSubmit((values) => {
                    void updateUserProfile({
                        userProfile: {
                            userId,
                        },
                        data: values,
                    });
                })
            }
        >
            <input placeholder={placeholderDisplayName} />
            <textarea placeholder={placeholderBio} />
        </form>
    );
}
