import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import appointmentRoute from "./routes/appointment.js";
import connectDB from "./utils/database.js";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "https://appointment-management-system-mr5q.vercel.app"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(cookieParser());

connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/appointments", appointmentRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Backend server is running");
});

export default app;
