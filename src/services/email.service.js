import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendAlertEmail = async (to, serverName, url) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: `🚨 ALERT: ${serverName} is DOWN`,
        html: `
            <h2>Server Down Alert</h2>
            <p><strong>${serverName}</strong> is not reachable.</p>
            <p>URL: ${url}</p>
            <p>Please check immediately.</p>
        `
    });
};