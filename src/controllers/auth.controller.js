import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { accessToken, refreshToken, user } = await loginUser(req.body);

        res.json({ message: "Login successful", accessToken, refreshToken, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}