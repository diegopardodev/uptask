"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import { ForgotPasswordInput, ForgotPasswordSchema } from "../schemas";
import { forgotPasswordAction } from "../actions";

export default function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: "all"
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        const response = await forgotPasswordAction(data);

        if (!response.ok) return toast.error(response.error);

        reset();
        toast.success(response.message);
    };

    return (
        <Form className="mt-10" onSubmit={handleSubmit(onSubmit)} aria-live={isSubmitting ? "polite" : "off"}>
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

            <FormSubmit loading={isSubmitting}>{isSubmitting ? "Sending…" : "Send reset link"}</FormSubmit>

            <p className="text-sm text-center">Back to <Link href="/auth/sign-in" className="text-primary-500 hover:underline"> sign in</Link></p>
        </Form>
    );
}
