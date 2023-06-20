import {useUser} from "@clerk/nextjs";
import {Title} from "@mantine/core";

export default function StudioPage() {
    const {user} = useUser();

    if (!user) {
        return null;
    }

    return <Title order={1}>Welcome to your studio, {user.username}</Title>;
}
