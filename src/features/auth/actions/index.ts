"use server";

import { actionError } from "@/src/shared/types/result";
import { SignInInput, SignInSchema, SignUpInput, SignUpSchema } from "../schemas";
import { authService } from "../services/AuthService";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);
    if (!data.success) return actionError("Invalid data");

    return await authService.signUp(data.data);
}

export async function signInAction(input: SignInInput) {
    const data = SignInSchema.safeParse(input);
    if (!data.success) return actionError("Invalid data");

    return await authService.signIn(input);
}