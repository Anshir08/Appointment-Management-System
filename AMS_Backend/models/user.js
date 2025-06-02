// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "doctor", "patient"],
            required: true,
            default: "patient",
        },
        specialization: {
            type: String, // applicable to doctors only
            default: null,
        },
        experience: {
            type: Number, // applicable to doctors only
            default: null,
        },
        availableSlots: [
            {
                date: {
                    type: Date,
                    required: true,
                },
                times: {
                    type: [String], // e.g. ["10:00", "14:30"]
                    required: true,
                },
            },
        ],
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
