import Link from "next/link";
import { Metadata } from "next";
import UnderlineHeading from "@/src/shared/components/typography/UnderlineHeading";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
    title: "Check your email",
    description: "Confirm your email address to finish creating your UpTask account."
};

export default function SignUpSuccessPage() {
    return (
        <>
            <UnderlineHeading title="Check your" highlight="inbox" className="text-center" />
            <div className="mt-10 bg-primary-100 rounded-full w-fit mx-auto p-3">
                <EnvelopeOpenIcon className="size-10 text-primary-500 mx-auto" />
            </div>
            <p className="text-gray-500 text-center mt-10">We sent a confirmation link to your email.</p>
            <p className="text-gray-500 text-center">Open it to activate your account.</p>
            <p className="text-sm text-center mt-10">Back to <Link href="/auth/sign-in" className="text-primary-500 hover:underline font-bold">Sign in</Link></p>
        </>
    );
}