import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import {
    getOwnAppointments,
    createAppointment,
    cancelAppointment,
    guestBooksAppointment,
    guestViewsAppointment,
    guestCancelsAppointment,
    getAllDoctorAppointments,
    updateAppointmentStatus,
    getAllAppointments,
    updateAnyAppointment,
    createAppointmentForPatient,
    deleteAnyAppointment,
} from "../services/appointment";

const initialState = {
    appointments: [],
    appointment: {},
    error: "",
    loading: false,
};

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOwnAppointments.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getOwnAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload.appointments;
            })
            .addCase(getOwnAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(cancelAppointment.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
                state.appointments = state.appointments.map((apt) =>
                    apt._id === action.payload.appointment._id
                        ? { ...apt, status: "cancelled" }
                        : apt
                );
            })
            .addCase(cancelAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(guestBooksAppointment.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(guestBooksAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
            })
            .addCase(guestBooksAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(guestViewsAppointment.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(guestViewsAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload.appointments;
            })
            .addCase(guestViewsAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(guestCancelsAppointment.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(guestCancelsAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
            })
            .addCase(guestCancelsAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getAllAppointments.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getAllAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload.appointments;
            })
            .addCase(getAllAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getAllDoctorAppointments.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getAllDoctorAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload.appointments;
            })
            .addCase(getAllDoctorAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateAppointmentStatus.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
                state.appointments = state.appointments.map((apt) =>
                    apt._id === action.payload.appointment._id
                        ? { ...apt, status: action.payload.appointment.status }
                        : apt
                );
            })
            .addCase(updateAppointmentStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(createAppointmentForPatient.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createAppointmentForPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
            })
            .addCase(createAppointmentForPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteAnyAppointment.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(deleteAnyAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
            })
            .addCase(deleteAnyAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateAnyAppointment.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updateAnyAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload.appointment;
            })
            .addCase(updateAnyAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default appointmentSlice.reducer;
