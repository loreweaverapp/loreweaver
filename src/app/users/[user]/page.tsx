import {useUser} from "@clerk/nextjs";

interface Props {
    params: {
        user: string;
    };
}

export default function UserPage({params}: Props) {
    const user = useUser();

    return <div>User: {params.user}</div>;
}
