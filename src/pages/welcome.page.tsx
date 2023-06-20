import Link from "next/link";
import {Button, Center, Container, Stack, Title} from "@mantine/core";

export default function WelcomePage() {
    return (
        <Stack align="center" justify="center">
            <Center>
                <Title order={1}>Welcome to Lore Weaver!</Title>
            </Center>
            <Container>
                <Button component={Link} size="lg" href="/sign-up">
                    sign up
                </Button>
                <Button component={Link} size="lg" href="/sign-in">
                    sign in
                </Button>
            </Container>
        </Stack>
    );
}
