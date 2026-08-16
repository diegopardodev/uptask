import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from "react-email";
import { emailTheme } from "../config/theme";
import { env } from "@/src/lib/env";

interface ResetPasswordProps {
    url: string;
}

export const ResetPasswordEmail = ({ url }: ResetPasswordProps) => (
    <Tailwind theme={emailTheme}>
        <Html>
            <Head />
            <Preview>The link expires in 1 hour.</Preview>
            <Body className="bg-bg-2 m-0 text-center font-sans">
                <Container className="max-mobile:mt-0 mx-auto mt-8 w-full max-w-160">
                    <Section>
                        <Section className="bg-bg max-mobile:px-2 px-6 py-4">
                            <Section className="mb-3 px-6">
                                <Row>
                                    <Column className="w-1/2 py-1.75 align-middle">
                                        <Row>
                                            <Column className="w-8 align-middle">
                                                <Img
                                                    src={`${env.APP_URL}/icon.svg`}
                                                    alt="UpTask"
                                                    width={23}
                                                    className="block"
                                                />
                                            </Column>
                                        </Row>
                                    </Column>
                                    <Column align="right" className="w-1/2 py-1.75 align-middle">
                                        <Text className="text-13 m-0 text-right font-sans">
                                            <span className="text-fg-3">UpTask</span>
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>

                            <Section className="bg-bg-2 max-mobile:px-6 max-mobile:py-12 rounded-lg px-10 py-16 text-center">
                                <Section>
                                    <Img
                                        src={`${env.APP_URL}/logo.svg`}
                                        alt="UpTask"
                                        width={100}
                                        height={100}
                                        className="w-auto pointer-events-none mx-auto mb-5 block"
                                    />
                                    <Heading as="h1" className="text-28 text-fg m-0 font-sans">
                                        Reset your password
                                    </Heading>
                                </Section>

                                <Text className="text-16 text-fg-2 mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
                                    We got a request to reset the password for your UpTask
                                    account. Choose a new one here:
                                </Text>

                                <Section className="mb-6 text-center">
                                    <Button
                                        href={`${url}/auth/reset-password`}
                                        className="bg-primary-500 text-16 text-white inline-block rounded-lg px-7 py-4 text-center font-serif leading-6"
                                    >
                                        Set a new password
                                    </Button>
                                </Section>

                                <Text className="text-13 text-fg-3 mx-auto mt-0 mb-8 max-w-100 text-center font-sans">
                                    This link expires in 1 hour and can only be used once.
                                </Text>

                                <Section className="mx-auto max-w-100 text-center">
                                    <Text className="text-13 text-fg-3 m-0 text-center font-sans">
                                        Button not working? Paste this into your browser:
                                    </Text>
                                    <Link
                                        href={`${url}/auth/reset-password`}
                                        className="text-13 text-primary-600 mt-1 block break-all text-center font-sans underline"
                                    >
                                        {url}/auth/reset-password
                                    </Link>
                                </Section>

                                <Text className="text-13 text-fg-3 mx-auto mt-8 mb-0 max-w-100 text-center font-sans">
                                    If you didn&apos;t request this, no action is needed —
                                    <br />
                                    your password hasn&apos;t changed.
                                </Text>
                            </Section>

                            <Section className="bg-bg">
                                <Row>
                                    <Column className="px-6 py-10 text-center">
                                        <Text className="text-13 text-fg-3 mx-auto mt-0 mb-8 max-w-70 text-center font-sans">
                                            — The UpTask team
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Html>
    </Tailwind>
);

ResetPasswordEmail.text = ({ url }: ResetPasswordProps) => `Reset your password

We got a request to reset the password for your UpTask account.
Choose a new one here:

${url}

This link expires in 1 hour and can only be used once.

If you didn't request this, no action is needed — your password
hasn't changed.

— The UpTask team
`;

ResetPasswordEmail.PreviewProps = {
    url: "http://localhost:3000/auth/reset-password/abc123",
} satisfies ResetPasswordProps;

export default ResetPasswordEmail;
