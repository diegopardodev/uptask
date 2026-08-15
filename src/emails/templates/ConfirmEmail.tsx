import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from "react-email";
import { emailTheme } from "../config/theme";

const baseUrl = process.env.APP_URL!;

interface ConfirmEmailProps {
    url: string;
}

export const ConfirmEmail = ({ url }: ConfirmEmailProps) => (
    <Tailwind theme={emailTheme}>
        <Html>
            <Head />
            <Preview>Confirm your email address</Preview>
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
                                                    src={`${baseUrl}/icon.svg`}
                                                    alt="UpTask Logo"
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
                                        src={`${baseUrl}/logo.svg`}
                                        alt="UpTask Logo"
                                        width={100}
                                        height={100}
                                        className="w-auto pointer-events-none mx-auto mb-5 block"
                                    />
                                    <Heading as="h1" className="text-28 text-fg m-0 font-sans">
                                        We&apos;re almost there!
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
                                        Confirm email
                                    </Button>
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
                                            - The UpTask team
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

ConfirmEmail.PreviewProps = {
    url: "http://localhost:3000",
} satisfies ConfirmEmailProps;

export default ConfirmEmail;
