// src/controllers/userController.ts
import { Request, Response } from "express";
import { ZodError } from 'zod';
import { userSchema, User } from "../models/userModules";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = userSchema.parse(req.body);

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        // @ts-ignore
        const newUser = await User.create({
            username,
            email,
            password,
        });

        return res.status(201).json({message: "User registered successfully", user: newUser});
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
