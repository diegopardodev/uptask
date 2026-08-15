import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "@/src/features/auth/components/SignUpForm";
import Heading from "@/src/shared/components/typography/Heading";
import Logo from "@/src/shared/components/ui/Logo";

export const metadata: Metadata = {
    title: "Create an account",
    description: "Create a free UpTask account and start planning your team's projects."
};

export default function SignUpPage() {
    return (
        <div className="max-w-xl mx-auto">
            <Logo />
            
            <div className="mt-10 space-y-2">
                <Heading>Create an account</Heading>
                <Heading level={5}>Start planning you team&apos;s work in minutes</Heading>
            </div>

            <SignUpForm />

            <footer className="mt-20 pb-10">
                <Heading level={6} className="text-center">By creating an account you agree to our <Link href="/" className="underline text-primary-500">Terms of Service</Link> and <Link href="/" className="underline text-primary-500">Privacy Policy</Link>.</Heading>
            </footer>
        </div>
    );
}
