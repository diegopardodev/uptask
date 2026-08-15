import { Metadata } from "next";
import SignUpForm from "@/src/features/auth/components/SignUpForm";
import Heading from "@/src/shared/components/typography/Heading";

export const metadata: Metadata = {
    title: "Create an account",
    description: "Create a free UpTask account and start planning your team's projects."
};

export default function SignUpPage() {
    return (
        <div className="max-w-xl mx-auto w-full">
            <div className="mt-10 space-y-2">
                <Heading>Create an account</Heading>
                <Heading level={5} className="text-gray-500">Start planning your team&apos;s work in minutes</Heading>
            </div>

            <SignUpForm />
        </div>
    );
}
