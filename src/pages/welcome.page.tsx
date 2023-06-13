import {Button} from "../components/ui/Button";

export default function WelcomePage() {
    return (
        <div>
            <h1>Welcome to Lore Weaver!</h1>
            <span>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="outline">Outline</Button>
            </span>
        </div>
    );
}
