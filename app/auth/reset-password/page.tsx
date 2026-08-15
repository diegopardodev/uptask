import ResetPasswordForm from "@/src/features/auth/components/ResetPasswordForm";
import Heading from "@/src/shared/components/typography/Heading";

export default function Page() {
    return (
        <div className="max-w-xl mx-auto w-full">
            <div className="mt-10 space-y-2">
                <Heading>Set a new password</Heading>
                <Heading level={5} className="text-gray-500">Choose a password you haven&apos;t used on UpTask before.</Heading>
            </div>

            <ResetPasswordForm />
        </div>
    );
}
