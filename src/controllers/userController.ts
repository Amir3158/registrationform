// src/controllers/userController.ts
import { Request, Response } from "express";
import { ZodError } from 'zod';
import { userRegistrationSchema, userLoginSchema, User } from "../models/userModules";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = userRegistrationSchema.parse(req.body);

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // @ts-ignore
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({message: "User registered successfully", user: newUser});
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password} = userLoginSchema.parse(req.body);
        const existingUser = await User.findOne({ where: { email } });
        if(!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if(!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({userId: existingUser.id, email: existingUser.email}, process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRATION_TIME})
        return res.status(200).json({ message: "Login successful ", token})
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ message: "Internal server error" });
    }



}
