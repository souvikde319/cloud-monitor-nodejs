import express from "express";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/auth.controller.js";
import User from "../models/User.model.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/refresh", async (req, res) => {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required" });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user  = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }
        const newAccessToken  = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "45m" }
        );
        res.json({ accessToken: newAccessToken });

    }catch (error) {
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    
});

router.post("/logout", async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    await User.findByIdAndUpdate(userId, { refreshToken: null });
    res.json({ message: "Logged out successfully" });
});

export default router;