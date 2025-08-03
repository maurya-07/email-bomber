const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

app.post("/send-email", async (req, res) => {
    try {
        let { email, subject, message, count } = req.body;

        if (!email || !subject || !message || !count) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        count = parseInt(count, 10);
        if (isNaN(count) || count < 1 || count > 50) {
            return res.status(400).json({ message: "Count must be between 1 and 50!" });
        }

        let sentEmails = 0;

        for (let i = 0; i < count; i++) {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: `(${i + 1}) ${subject}`,
                text: message,
            });
            sentEmails++;
            console.log(`Email ${sentEmails} sent to: ${email}`);
        }

        res.status(200).json({ message: `${sentEmails} emails have been sent successfully!` });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "An error occurred while sending the email!", error: error.toString() });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));