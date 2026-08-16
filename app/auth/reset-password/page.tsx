import { Metadata } from "next";
import ResetPasswordForm from "@/src/features/auth/components/ResetPasswordForm";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import Heading from "@/src/shared/components/typography/Heading";

export const metadata: Metadata = {
    title: "Set a new password",
};

export default function Page() {
    return (
        <div className="max-w-xl mx-auto w-full">
            <div className="mt-10 space-y-2">
                <UnderlineHeading title="Set a new" highlight="password" />
                <Heading level={5}>Choose a password you haven&apos;t used on UpTask before.</Heading>
            </div>

            <ResetPasswordForm />
        </div>
    );
}
