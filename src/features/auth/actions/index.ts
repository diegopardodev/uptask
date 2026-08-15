"use server";

import { actionError } from "@/src/shared/types/result";
import { ForgotPasswordInput, ForgotPasswordSchema, ResetPasswordInput, ResetPasswordSchema, SignInInput, SignInSchema, SignUpInput, SignUpSchema } from "../schemas";
import { authService } from "../services/AuthService";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    return await authService.signUp(data.data);
}

export async function signInAction(input: SignInInput) {
    const data = SignInSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    return await authService.signIn(input);
}

export async function forgotPasswordAction(input: ForgotPasswordInput) {
    const data = ForgotPasswordSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    return await authService.forgotPassword(input);
}

export async function resetPasswordAction(input: ResetPasswordInput, token: string) {
    const data = ResetPasswordSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");
    return await authService.resetPassword(input, token);
}