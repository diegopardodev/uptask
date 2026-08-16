import { APIError } from "better-auth";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { ForgotPasswordInput, ResetPasswordInput, SignInInput, SignUpInput } from "../schemas";
import { actionError, actionOk } from "@/src/shared/types/result";
import { authRepository, IAuthRepository } from "./AuthRepository";

class AuthService {
    constructor(
        private readonly authRepository: IAuthRepository
    ) {}

    async signUp(credentials: SignUpInput) {
        const { name, email, password } = credentials;

        const user = await this.authRepository.findByEmail(email);
        if (user) return actionError("An account with this email already exists.");

        try {
            await auth.api.signUpEmail({
                body: {
                    name,
                    email,
                    password,
                    callbackURL: "/auth/sign-in"
                },
                headers: await headers()
            });

            return actionOk("Account created. Check your email to confirm it.");
        } catch (error) {
            if (error instanceof APIError) {
                return actionError(error.message);
            }
            
            return actionError("Something went wrong on our end. Try again in a moment.");
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
                    password,
                    callbackURL: "/"
                },
                headers: await headers()
            });

            return actionOk();
        } catch (error) {
            if (error instanceof APIError) {
                if (error.statusCode === 401) return actionError("That email and password don't match. Check both and try again.");
                return actionError(error.message);
            }

            return actionError("Something went wrong on our end. Try again in a moment.");
        }
    }

    async forgotPassword(credentials: ForgotPasswordInput) {
        const { email } = credentials;

        try {
            await auth.api.requestPasswordReset({
                body: {
                    email
                }
            });

            return actionOk(`If an account exists for ${email}, we've sent a link to reset your password. It expires in 1 hour.`);
        } catch (error) {
            if (error instanceof APIError) return actionError(error.message);
            return actionError("Something went wrong on our end. Try again in a moment.");
        }
    }

    async resetPassword(credentials: ResetPasswordInput, token: string) {
        const { password } = credentials;

        try {
            await auth.api.resetPassword({
                body: {
                    newPassword: password,
                    token
                }
            });

            return actionOk("Password updated. Sign in with your new password.");
        } catch (error) {
            if (error instanceof APIError) return actionError(error.message);
            return actionError("Something went wrong on our end. Try again in a moment.");
        }
    }
}

export const authService = new AuthService(authRepository);