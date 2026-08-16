import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";
import ForgotPasswordForm from "@/src/features/auth/components/ForgotPasswordForm";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";

export const metadata: Metadata = {
    title: "Reset your password",
};

export default function ForgotPasswordPage() {
    return (
        <div className="max-w-xl mx-auto w-full">
            <div className="mt-10 space-y-2">
                <UnderlineHeading title="Reset your" highlight="password" />
                <Heading level={5} className="text-gray-500">Enter your email and we&apos;ll send you a link to set a new one.</Heading>
            </div>

            <ForgotPasswordForm />
        </div>
    );
}
