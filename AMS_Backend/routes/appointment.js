import { Router } from "express";
import { cancelAppointment, createAppointment, createAppointmentforPatient, deleteAnyAppointment, getAllAppointments, getAllDoctorAppointments, getOwnAppointments, guestBooksAppointment, guestCancelsAppointment, guestViewsAppointment, updateAnyAppointment, updateAppointmentStatus } from "../controllers/appointment.js";
import { isAuthenticated, isAuthorized, isGuest } from "../middlewares/auth.js";

const router = Router();

// for Patients
router.post("/", isAuthenticated, isAuthorized('patient', 'admin'), createAppointment);

router.get("/", isAuthenticated, isAuthorized('patient', 'admin'), getOwnAppointments);

router.put("/:id/cancel", isAuthenticated, isAuthorized('patient', 'admin'), cancelAppointment);

// For Guests
router.post("/guest", isGuest, guestBooksAppointment);

router.get("/guest", isGuest, guestViewsAppointment);

router.put("/guest/:id/cancel", isGuest, guestCancelsAppointment);

// For Doctors
router.get("/doctor", isAuthenticated, isAuthorized('doctor'), getAllDoctorAppointments);

router.put("/doctor/:id/status", isAuthenticated, isAuthorized('doctor', 'admin'), updateAppointmentStatus);

// For Admins
router.get("/admin", isAuthenticated, isAuthorized('admin'), getAllAppointments);

router.put("/admin/:id", isAuthenticated, isAuthorized('admin'),updateAnyAppointment);

router.post("/admin", isAuthenticated, isAuthorized('admin'), createAppointmentforPatient);

router.delete("/admin/:id", isAuthenticated, isAuthorized('admin'), deleteAnyAppointment);

export default router;
