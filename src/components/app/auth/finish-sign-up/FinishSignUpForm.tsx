import {z} from "zod";
import {useAuth} from "@clerk/nextjs";
import {useForm, zodResolver} from "@mantine/form";
import {Button, Textarea, TextInput, Title} from "@mantine/core";
import {api} from "$/trpc/client";

const formSchema = z.object({
    displayName: z.string().max(64).optional(),
    bio: z.string().max(256).optional(),
});

export function FinishSignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        validate: zodResolver(formSchema),
        initialValues: {
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
            onSubmit={form.onSubmit((values) =>
                mutate({
                    userProfile: {userId},
                    data: {
                        ...values,
                    },
                }),
            )}
        >
            <Title order={1}>Setup Your Profile</Title>
            <Title order={2}>
                You can always customize your profile later if you want to skip
                this step now.
            </Title>
            <TextInput
                label="Display Name"
                placeholder="(Optional) Enter your display name"
                {...form.getInputProps("displayName")}
            />
            <Textarea
                label="Bio"
                placeholder="(Optional) Write a bit about yourself..."
                {...form.getInputProps("bio")}
            />
            <Button type="submit">Confirm</Button>
            <Button type="button" variant="light">
                Continue to site (skip)
            </Button>
        </form>
    );
}
