import Link from "next/link";
import { Form, FormLabel, FormInput, FormSubmit } from "@/src/shared/components/forms";

export default function SignInForm() {
    return (
        <Form className="mt-10">
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
                <div className="flex items-center justify-between gap-3">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link href="/" className="text-sm md:text-base text-primary-500 hover:underline">Forgot your password?</Link>
                </div>
                <FormInput
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                />
                <p className="text-sm">At least 8 characters</p>
            </div>

            <FormSubmit>Sign In</FormSubmit>

            <p className="text-sm text-center">Don&apos;t have an account? <Link href="/auth/sign-up" className="text-primary-500 hover:underline"> Sign Up</Link></p>
        </Form>
    );
}
