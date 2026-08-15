import { Metadata } from "next";
import SignInForm from "@/src/features/auth/components/SignInForm";
import Heading from "@/src/shared/components/typography/Heading";
import Logo from "@/src/shared/components/ui/Logo";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to UpTask to manage your projects, tasks, and team."
};

export default function SignInPage() {
    return (
        <div className="max-w-xl mx-auto flex flex-col justify-center h-full">
            <Logo />
            
            <div className="mt-10 space-y-2">
                <Heading>Sign in to your account</Heading>
                <Heading level={5} className="text-gray-500">Pick up where your team left off.</Heading>
            </div>

            <SignInForm />
        </div>
    );
}
