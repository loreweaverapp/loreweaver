import {useUser} from "@clerk/nextjs";

export default function StudioPage() {
    const {user} = useUser();

    if (!user) {
        return null;
    }

    return <h1>Welcome to your studio, {user.username}</h1>;
}
