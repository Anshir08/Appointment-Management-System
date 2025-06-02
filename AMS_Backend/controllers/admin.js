import User from "../models/user.js";
import Appointment from "../models/appointment.js";
import { generateSlotsForNext7Days } from "../utils/createSlots.js";
import bcrypt from "bcrypt";

// getAllUsers
export const getAllUsers = async (req, res) => {
    try {
        // const users = await User.find().skip(req.query.limit*(req.query.page-1)).limit(req.query.limit);
        const users = await User.find({ role:req.query.role });
        
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// getUserById
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// updateUserById
export const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// deleteUserById
export const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// createDoctor
export const createDoctor = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPassword,
            role: "doctor",
            availableSlots: generateSlotsForNext7Days(),
        });
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
