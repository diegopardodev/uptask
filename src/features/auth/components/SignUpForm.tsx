"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import { SignUpInput, SignUpSchema } from "../schemas";
import { signUpAction } from "../actions";
import { toast } from "sonner";

export default function SignUpForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(SignUpSchema),
        mode: "all"
    });

    const onSubmit = async (data: SignUpInput) => {
        const response = await signUpAction(data);

        if (!response.ok) {
            toast.error(response.error);
            return;
        }

        toast.success(response.message);
        reset();
    };

    return (
        <Form className="mt-10" onSubmit={handleSubmit(onSubmit)} aria-live={isSubmitting ? "polite" : "off"}>
            <div className="space-y-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    error={errors.name ? true : false}
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
                    error={errors.email ? true : false}
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
                    error={errors.password ? true : false}
                    aria-describedby="Password must be at least 8 characters"
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
                    error={errors.passwordConfirmation ? true : false}
                    {...register("passwordConfirmation")}
                />
                {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
            </div>

            <FormSubmit
                loading={isSubmitting}
            >
                {isSubmitting ? "Creating account…" : "Create account"}
            </FormSubmit>

            <p className="text-sm text-center">Already have an account? <Link href="/auth/sign-in" className="text-primary-500 hover:underline"> sign in</Link></p>
        </Form>
    );
}
