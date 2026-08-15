"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import { ResetPasswordInput, ResetPasswordSchema } from "../schemas";
import { resetPasswordAction } from "../actions";

export default function SetNewPassword() {
    const params = useSearchParams();
    const token = params.get("token");
    if (!token) redirect("/auth/sign-in");

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(ResetPasswordSchema),
        mode: "all"
    });

    const onSubmit = async (data: ResetPasswordInput) => {
        const response = await resetPasswordAction(data, token);
        if (!response.ok) return toast.error(response.error);

        toast.success(response.message);
        redirect("/auth/sign-in");
    };

    return (
        <Form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <FormLabel htmlFor="password">New password</FormLabel>
                <FormInput
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    error={errors.password ? true : false}
                    {...register("password")}
                />
                {errors.password && <FormError>{errors.password.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="passwordConfirmation">Confirm new password</FormLabel>
                <FormInput
                    id="passwordConfirmation"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    error={errors.passwordConfirmation ? true : false}
                    {...register("passwordConfirmation")}
                />
                {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
            </div>

            <FormSubmit loading={isSubmitting}>{isSubmitting ? "Saving…" : "Save new password"}</FormSubmit>

            <p className="text-sm text-center">Back to <Link href="/auth/sign-in" className="text-primary-500 hover:underline"> sign in</Link></p>
        </Form>
    );
}
