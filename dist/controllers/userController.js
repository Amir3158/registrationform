"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const registerUser = (req, res) => {
    const { username, email, password } = req.body;
    // if (findUserByEmail(email)) {
    //     return res.status(400).json({ message: "User already exists" });
    // }
    const newUser = {
        id: Date.now(), // Simple ID generation for this example
        username,
        email,
        password
    };
    return res.status(201).json({ message: "User registered successfully", newUser });
};
exports.registerUser = registerUser;
