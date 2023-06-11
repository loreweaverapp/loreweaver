import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";
import {api} from "$/trpc/server";
import {FinishSignUpForm} from "$/app/(auth)/finish-sign-up/FinishSignUpForm";

export default async function FinishSignUpPage() {
    return <FinishSignUpForm />;
}
