import cron from "node-cron";
import axios from "axios";
import Server from "../models/server.model.js";
import { sendAlertEmail } from "./email.service.js";

export const startMonitoring = () => {
    cron.schedule("* * * * *", async () => {
        console.log("Running server health check...");

        const servers = await Server.find().populate("createdBy");

        for (const server of servers) {
            const previousStatus = server.status;

            try {
                const res = await axios.get(server.url, {
                    timeout: 5000,
                    validateStatus: () => true
                });

                if (res.status >= 200 && res.status < 300) {
                    server.status = "up";
                } else {
                    server.status = "down";
                }

            } catch {
                server.status = "down";
            }

            server.lastChecked = new Date();

            // 🚨 ALERT ONLY WHEN STATUS CHANGES
            if (previousStatus === "up" && server.status === "down") {
                console.log(`ALERT: ${server.name} is DOWN`);

                if (server.createdBy?.email) {
                    await sendAlertEmail(
                        server.createdBy.email,
                        server.name,
                        server.url
                    );
                }
            }

            await server.save();
        }
    });
};