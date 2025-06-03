import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: smtp.gmail.com,
        port: 465,
        secure: true,
        auth: {
            user: "chaudharyanshirsingh2050@gmail.com",
            pass: "pybj joao pzsx ejxs",
        },
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    try {
        const info = await transporter.sendMail(message);
        console.log(`Email sent: ${info.messageId}`);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};
