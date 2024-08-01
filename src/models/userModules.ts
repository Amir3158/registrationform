import { z } from 'zod';

export interface userModel {
    id: number,
    username: string,
    email: string,
    password: string
}

export const userSchema = z.object({
    username: z.string().min(5, "userName must be at least 5 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters long")
})