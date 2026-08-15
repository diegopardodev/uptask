"use server";

import { actionError } from "@/src/shared/types/result";
import { SignUpInput, SignUpSchema } from "../schemas";
import { authService } from "../services/AuthService";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);

    if (!data.success) {
        return actionError("Invalid data");
    }

    const response = await authService.signUp(data.data);
    return response;
}