"use client";

import {useAuth, UserButton} from "@clerk/nextjs";

export default function CurrentUser() {
    const user = useAuth();

    return (
        <>
            <UserButton afterSignOutUrl="/" />
            <div>Current user: {user.userId}</div>
        </>
    );
}
