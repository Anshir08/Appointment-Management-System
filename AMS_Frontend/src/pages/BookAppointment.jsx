import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    createAppointment,
    guestBooksAppointment,
} from "../redux/services/appointment";
import dayjs from "dayjs";
import {
    getSingleDoctor,
    updateDoctorAvailability,
} from "../redux/services/auth";
import { useParams } from "react-router-dom";

const generateNext7Days = () =>
    Array.from({ length: 7 }).map((_, i) => {
        const date = dayjs().add(i, "day");
        return {
            label: date.format("ddd"),
            date: date.format("YYYY-MM-DD"),
            display: date.format("MMM D"),
        };
    });

const workingHours = Array.from({ length: 9 }, (_, i) => `${9 + i}:00`);

const BookAppointment = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { appointment } = useSelector((state) => state.appointment);
    const { user, doctor, error, loading } = useSelector((state) => state.auth);
    const [selectedDate, setSelectedDate] = useState(
        dayjs().format("YYYY-MM-DD")
    );
    const [selectedTime, setSelectedTime] = useState(workingHours[0]);
    const [reason, setReason] = useState("");
    const [guestEmail, setGuestEmail] = useState("");

    const next7Days = generateNext7Days();

    const isSlotAvailable = (time) => {
        const availableSlot = doctor?.availableSlots.find(
            (slot) =>
                slot.date.split("T")[0] === selectedDate &&
                slot.times.includes(time)
        );

        return availableSlot && availableSlot !== undefined;
    };

    useEffect(() => {
        dispatch(getSingleDoctor(params.id));
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        user._id
            ? dispatch(
                  createAppointment({
                      createdByRole: user.role,
                      doctorId: doctor._id,
                      date: selectedDate,
                      time: selectedTime,
                      reason,
                  })
              )
            : dispatch(
                  guestBooksAppointment({
                      createdByRole: "guest",
                      guestEmail,
                      doctorId: doctor._id,
                      date: selectedDate,
                      time: selectedTime,
                      reason,
                  })
              );
        const updatedSlots = doctor?.availableSlots.map((slot) => {
            if (slot.date.split("T")[0] === selectedDate) {
                return {
                    ...slot,
                    times: slot.times.filter((time) => time !== selectedTime),
                };
            }
            return slot;
        });

        dispatch(
            updateDoctorAvailability({
                id: doctor._id,
                data: { ...doctor, availableSlots: updatedSlots },
            })
        );
    };

    return (
        <Paper
            elevation={3}
            sx={{ p: 4, m: 4, maxWidth: 600, mx: "auto", borderRadius: 4 }}
        >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar
                    src={doctor?.profileImage}
                    sx={{ width: 64, height: 64 }}
                />
                <Box>
                    <Typography variant="h6">
                        {doctor?.name || "Dr. John Doe"}
                    </Typography>
                    <Typography variant="body2">
                        {doctor?.specialization} | {doctor?.experience} years
                    </Typography>
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {appointment._id && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Appointment booked successfully!{" "}
                    {!user._id && "Please check your email."}
                </Alert>
            )}

            {!user._id && (
                <TextField
                    label="Guest Email"
                    fullWidth
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    sx={{ mb: 3 }}
                />
            )}

            <Typography variant="subtitle1" gutterBottom>
                Date
            </Typography>
            <Box display="flex" gap={1} mb={2}>
                {next7Days.map(({ label, date, display }) => (
                    <Button
                        key={date}
                        variant={
                            selectedDate === date ? "contained" : "outlined"
                        }
                        onClick={() => setSelectedDate(date)}
                        sx={{ minWidth: 70 }}
                    >
                        <Box>
                            <Typography variant="caption">{label}</Typography>
                            <Typography variant="body2">{display}</Typography>
                        </Box>
                    </Button>
                ))}
            </Box>

            <Typography variant="subtitle1" gutterBottom>
                Time
            </Typography>
            <Grid container spacing={1} mb={2}>
                {workingHours.map((time) => {
                    const available = isSlotAvailable(time);
                    return (
                        <Grid item xs={3} key={time}>
                            <Button
                                variant={
                                    selectedTime === time
                                        ? "contained"
                                        : "outlined"
                                }
                                disabled={!available}
                                onClick={() => setSelectedTime(time)}
                                fullWidth
                                sx={{ opacity: available ? 1 : 0.5 }}
                            >
                                {time}
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>

            <TextField
                label="Reason for Appointment"
                fullWidth
                multiline
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                sx={{ mb: 3 }}
            />

            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Booking..." : "Book Appointment"}
            </Button>
        </Paper>
    );
};

export default BookAppointment;
