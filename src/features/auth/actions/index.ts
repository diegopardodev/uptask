"use server";

import { actionError } from "@/src/shared/types/result";
import { SignUpInput, SignUpSchema } from "../schemas";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);

    if (!data.success) {
        return actionError("Invalid data");
    }

    console.log(data.data);
}