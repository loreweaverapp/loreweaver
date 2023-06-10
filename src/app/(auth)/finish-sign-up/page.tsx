import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";
import {updateUserProfile} from "../../actions";

export default async function FinishSignUpPage() {
    const user = await currentUser();

    if (!user || user.privateMetadata.profileInitialized === true) {
        redirect("/", RedirectType.replace);
        return null;
    }

    return <form action={updateUserProfile} />;
}
