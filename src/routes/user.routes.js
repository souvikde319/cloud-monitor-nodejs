import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 Only logged-in users
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "User profile fetched",
        user: req.user
    });
});

// 👑 Only admin
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
});

export default router;