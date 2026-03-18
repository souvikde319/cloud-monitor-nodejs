import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
// import authRoutes from  "./routes/auth.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import serverRoutes  from "./routes/server.route.js"
import { startMonitoring } from "./services/monitor.service.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/servers", serverRoutes);

app.get('/', (req,res) => {
    res.send("Welcome to Cloud Monitor API");
})

export default app;