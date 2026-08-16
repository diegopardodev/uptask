"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormLabel, FormInput, FormSubmit, FormError } from "@/src/shared/components/forms";
import { SignInInput, SignInSchema } from "../schemas";
import { signInAction } from "../actions";

export default function SignInForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(SignInSchema),
        mode: "all"
    });

    const onSubmit = async (data: SignInInput) => {
        const response = await signInAction(data);

        if (!response.ok) {
            toast.error(response.error);
            return;
        }

        redirect("/");
    };

    return (
        <Form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex items-center justify-between gap-3">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link href="/auth/forgot-password" className="text-sm md:text-base text-primary-500 hover:underline">Forgot your password?</Link>
                </div>
                <FormInput
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    error={errors.password ? true : false}
                    {...register("password")}
                />
                {errors.password && <FormError>{errors.password.message}</FormError>}
            </div>

            <FormSubmit loading={isSubmitting}>{ isSubmitting ? "Signing in…" : "Sign in" }</FormSubmit>

            <p className="text-sm text-center">Don&apos;t have an account? <Link href="/auth/sign-up" className="text-primary-500 hover:underline"> Sign up</Link></p>
        </Form>
    );
}
