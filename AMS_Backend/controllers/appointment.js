import Appointment from "../models/appointment.js";
import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

// for patients
export const createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create({
            ...req.body,
            patientId: req.user._id,
        });
        res.status(201).json({ success: true, appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOwnAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({patientId:req.user._id})
            .populate("doctorId", "name specialization")
            .populate("patientId", "name");
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        appointment.status = "cancelled";
        await appointment.save();
        res.status(200).json({
            success: true,
            appointment,
            message: "Appointment canceled successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// for guests
export const guestBooksAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        const secure_token = jwt.sign(
            { _id: appointment._id, guestEmail: req.body.guestEmail },
            process.env.JWT_SECRET
        );
        const doctor = await User.findById( req.body.doctorId );
        const message = `Your appointment has been booked successfully. \n\n Appointment Date: <b>${appointment.date}</b> \n Appointment Time: <b>${appointment.time}</b> \n Doctor Name: <b>${doctor.name}</b> \n\n View your appointment details here: ${process.env.CLIENT_URL}/appointments/${appointment._id}/${secure_token}`;

        await sendEmail({
            email: req.body.guestEmail,
            subject: "Appointment Booked Successfully at AMS",
            message,
        });
        res.status(201).json({ success: true, appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const guestViewsAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { token } = req.query;

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (payload.appointmentId !== appointmentId) {
            return res
                .status(403)
                .json({ message: "Invalid token for appointment" });
        }

        const appointment = await Appointment.findOne({
            _id: appointmentId,
            guestEmail: payload.guestEmail,
        });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ success: true, appointment });
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const guestCancelsAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { token } = req.query;

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Optional: confirm that appointmentId matches token payload
        if (payload.appointmentId !== appointmentId) {
            return res.status(403).json({ message: "Invalid token" });
        }

        // Optional: find appointment by ID & email to be sure
        const appointment = await Appointment.findOne({
            _id: appointmentId,
            guestEmail: payload.guestEmail,
        });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        appointment.status = "cancelled";
        await appointment.save();
        res.status(200).json({
            success: true,
            message: "Appointment canceled successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// for doctors
export const getAllDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.user._id })
            .populate("doctorId", "name specialization")
            .populate("patientId", "name");
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        appointment.status = req.body.status;
        await appointment.save();
        res.status(200).json({
            success: true,
            appointment,
            message: `Appointment ${req.body.status} successfully`,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// for admins
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("doctorId", "name specialization")
        console.log(appointments);
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createAppointmentforPatient = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAnyAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        appointment.status = req.body.status;
        await appointment.save();
        res.status(200).json({
            success: true,
            message: `Appointment ${req.body.status} successfully`,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAnyAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
