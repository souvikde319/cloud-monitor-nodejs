import express from 'express';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';
import { addServer, getServers } from '../controllers/server.controller.js';
const router = express.Router();

router.post("/", protect, addServer);
router.get("/", protect, getServers);

export default router;