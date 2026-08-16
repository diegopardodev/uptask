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

interface ConfirmEmailProps {
    url: string;
}

export const ConfirmEmail = ({ url }: ConfirmEmailProps) => (
    <Tailwind theme={emailTheme}>
        <Html>
            <Head />
            <Preview>One click and you&apos;re in.</Preview>
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
                                        We&apos;re almost there
                                    </Heading>
                                </Section>

                                <Text className="text-16 text-fg-2 mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
                                    Thank you for signing up for UpTask.
                                    <br />
                                    To verify your account, we just need to confirm your email
                                    address.
                                </Text>

                                <Section className="mb-6 text-center">
                                    <Button
                                        href={url}
                                        className="bg-primary-500 text-16 text-white inline-block rounded-lg px-7 py-4 text-center font-serif leading-6"
                                    >
                                        Confirm my account
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
                                        href={url}
                                        className="text-13 text-primary-600 mt-1 block break-all text-center font-sans underline"
                                    >
                                        {url}
                                    </Link>
                                </Section>

                                <Text className="text-13 text-fg-3 mx-auto mt-8 mb-0 max-w-100 text-center font-sans">
                                    If you didn&apos;t request this,
                                    <br />
                                    please ignore this email.
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

ConfirmEmail.text = ({ url }: ConfirmEmailProps) => `We're almost there

Thank you for signing up for UpTask. To verify your account, we just
need to confirm your email address.

Confirm my email:
${url}

If you didn't request this, please ignore this email.

— The UpTask team
`;

ConfirmEmail.PreviewProps = {
    url: "http://localhost:3000",
} satisfies ConfirmEmailProps;

export default ConfirmEmail;
