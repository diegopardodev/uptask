import Link from "next/link";
import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";

export default function SignUpForm() {
    return (
        <Form className="mt-10">
            <div className="space-y-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                />
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                />
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                />
                <p className="text-sm">At least 8 characters</p>
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="passwordConfirmation">Confirm password</FormLabel>
                <FormInput
                    id="passwordConfirmation"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                />
            </div>

            <FormSubmit>Create account</FormSubmit>

            <p className="text-sm text-center">Already have an account? <Link href="/auth/sign-in" className="text-primary-500 hover:underline"> Sign In</Link></p>
        </Form>
    );
}
