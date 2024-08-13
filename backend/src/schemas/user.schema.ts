import { z } from 'zod';

export const authUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z
        .string()
        .min(8, { message: 'Password should have a lentgh of 8 characters' }),
});

export type AuthUserSchemaTypes = z.infer<typeof authUserSchema>;
