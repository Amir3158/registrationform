// src/controllers/userController.ts
import { Request, Response } from "express";
import { ZodError } from 'zod';
import { userSchema, userModel } from "../models/userModules";

export const registerUser = (req: Request, res: Response) => {
    try {
        const {username, email, password} = userSchema.parse(req.body);

        // if (findUserByEmail(email)) {
        //     return res.status(400).json({ message: "User already exists" });
        // }

        const newUser: userModel = {
            id: Date.now(), // Simple ID generation for this example
            username,
            email,
            password
        };

        return res.status(201).json({message: "User registered successfully", newUser});
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
