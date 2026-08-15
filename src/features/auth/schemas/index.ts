import z from "zod";

const BaseSchema = z.object({
    name: z.string().trim().min(2, { error: "Your name must be at least 2 characters" }).max(60, { error: "Your name can't be longer than 60 characters" }),
    email: z.email({ error: "Enter a valid email address" }),
    password: z.string().trim().min(8, { error: "Your password must be at least 8 characters" }).max(72, { error: "Your password can't be longer than 72 characters" }),
    passwordConfirmation: z.string().trim().min(1, { error: "Confirm your password" })
});

export const SignUpSchema = BaseSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true
}).refine(data => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    error: "Passwords don't match"
});

export type SignUpInput = z.infer<typeof BaseSchema>;