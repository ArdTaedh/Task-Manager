import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Must be at least 8 characters",
    }),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Must be at least 8 characters",
    }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
