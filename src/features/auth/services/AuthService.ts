import { APIError } from "better-auth";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { SignInInput, SignUpInput } from "../schemas";
import { actionError, actionOk } from "@/src/shared/types/result";
import { authRepository, IAuthRepository } from "./AuthRepository";

class AuthService {
    constructor(
        private readonly authRepository: IAuthRepository
    ) {}

    async signUp(credentials: SignUpInput) {
        const { name, email, password } = credentials;

        const user = await this.authRepository.findByEmail(email);
        if (user) return actionError("An account with this email already exists");

        try {
            await auth.api.signUpEmail({
                body: {
                    name,
                    email,
                    password
                },
                headers: await headers()
            });

            return actionOk("Account created. Check your email to confirm it.");
        } catch (error) {
            if (error instanceof APIError) {
                return actionError(error.message);
            }
            
            return actionError("Couldn't sign up");
        }
    }

    async signIn(credentials: SignInInput) {
        const { email, password } = credentials;

        const user = await this.authRepository.findByEmail(email);
        if (!user) return actionError("That email and password don't match. Check both and try again.");

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password
                },
                headers: await headers()
            });

            return actionOk();
        } catch (error) {
            if (error instanceof APIError) {
                if (error.statusCode === 401) return actionError("That email and password don't match. Check both and try again.");
                return actionError(error.message);
            }

            return actionError("Couldn't sign in");
        }
    }
}

export const authService = new AuthService(authRepository);