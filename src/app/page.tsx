import {UserButton} from "@clerk/nextjs";

export default async function Home() {
    return (
        <main>
            <UserButton afterSignOutUrl="/" />
        </main>
    );
}
