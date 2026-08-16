import { Metadata } from "next";
import SignInForm from "@/src/features/auth/components/SignInForm";
import Heading from "@/src/shared/components/typography/Heading";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to UpTask to manage your projects, tasks, and team."
};

export default async function SignInPage() {
    return (
        <div className="max-w-xl mx-auto w-full">
            <div className="mt-10 space-y-2">
                <UnderlineHeading title="Sign in to your" highlight="account" />
                <Heading level={5} className="text-gray-500">Pick up where your team left off.</Heading>
            </div>

            <SignInForm />
        </div>
    );
}
