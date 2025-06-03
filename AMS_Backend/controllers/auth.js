import User from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt";

export const registerPatient = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Patient already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ ...req.body, password: hashedPassword });
  
  try {
    const result = await newUser.save();
    sendToken(res, result, 201, "User created");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(403).json({ message: "Invalid Email or Password" });
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return res.status(403).json({ message: "Invalid Email or Password" });
  }

  sendToken(res, user, 200, "LoggedIn Successfully");
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("authToken", "", { ...cookieOptions, maxAge: 0 })
    .json({ success: true, message: "Logged out successfully" });
}


export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSingleDoctor = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (doctor.role !== "doctor") {
      return res.status(400).json({ message: "Invalid request" });
    }
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDoctorAvailability = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (doctor.role !== "doctor") {
      return res.status(400).json({ message: "Invalid request" });
    }
    doctor.availableSlots = req.body.availableSlots;
    await doctor.save();
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};