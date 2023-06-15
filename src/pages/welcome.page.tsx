import Link from "next/link";
import {Button} from "../components/ui/Button";
import {Heading} from "../components/ui/Heading";

export default function WelcomePage() {
    return (
        <main className="flex flex-col items-center justify-center gap-5 p-10">
            <Heading level={1} size="3xl">
                Welcome to Lore Weaver!
            </Heading>
            <div className="flex flex-row-reverse gap-5">
                <Button as={Link} variant="primary" size="lg" href="/sign-up">
                    sign up
                </Button>
                <Button variant="secondary" size="lg">
                    sign in
                </Button>
            </div>
        </main>
    );
}
