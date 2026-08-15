"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import { SignUpInput, SignUpSchema } from "../schemas";
import { signUpAction } from "../actions";

export default function SignUpForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(SignUpSchema),
        mode: "all"
    });

    const onSubmit = async (data: SignUpInput) => {
        await signUpAction(data);
    };

    return (
        <Form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    {...register("name")}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    {...register("email")}
                />
                {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...register("password")}
                />
                {
                    errors.password ? <FormError>{errors.password.message}</FormError> 
                    : <p className="text-sm">At least 8 characters</p>
                }
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="passwordConfirmation">Confirm password</FormLabel>
                <FormInput
                    id="passwordConfirmation"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...register("passwordConfirmation")}
                />
                {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
            </div>

            <FormSubmit loading={isSubmitting}>{isSubmitting ? "Creating account..." : "Create account"}</FormSubmit>

            <p className="text-sm text-center">Already have an account? <Link href="/auth/sign-in" className="text-primary-500 hover:underline"> Sign In</Link></p>
        </Form>
    );
}
