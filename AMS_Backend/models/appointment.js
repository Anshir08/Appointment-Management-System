// models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    guestEmail: {
      type: String,
      default: null,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdByRole: {
      type: String,
      enum: ["admin", "patient", "guest"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "completed"
      ],
      default: "pending",
    },
    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// enforce 1 appointment per doctor per time slot
// appointmentSchema.index({ doctorId: 1, date: 1 }, { unique: true }); 

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
