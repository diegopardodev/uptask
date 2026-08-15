import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "../db";
import * as schema from "../db/schema";
import { AuthEmailService } from "../emails/services/AuthEmailService";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
        usePlural: true
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user: { email }, url }) => {
            await AuthEmailService.sendResetPasswordEmail(email, url);
        }
    },
    emailVerification: {
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user: { email }, url }) => {
            await AuthEmailService.sendConfirmEmail(email, url);
        }
    },
    plugins: [nextCookies()]
});