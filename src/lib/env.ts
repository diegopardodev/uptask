import z from "zod";

const EnvSchema = z.object({
    APP_NAME: z.string().min(1),
    APP_URL: z.url(),
    DATABASE_URL: z.url().startsWith("postgresql"),
    BETTER_AUTH_SECRET: z.string().min(32, "Must be at least 32 chars"),
    BETTER_AUTH_URL: z.url(),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().int().min(1).max(65535),
    SMTP_USER: z.string().min(1),
    SMTP_PASS: z.string().min(1)
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) throw new Error(`Invalid environment variables: ${z.prettifyError(parsed.error)}`);

export const env = parsed.data;