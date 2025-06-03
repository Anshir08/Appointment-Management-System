import React, { useState, useEffect } from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useSelector, useDispatch } from "react-redux";
import {
    cancelAppointment,
    getAllAppointments,
    getOwnAppointments,
    updateAppointmentStatus,
} from "../redux/services/appointment";
import { getAllDoctorAppointments } from "../redux/services/appointment";

const statusTabs = ["pending", "confirmed", "cancelled", "completed"];

export default function ViewAppointments() {
    const [activeTab, setActiveTab] = useState("pending");
    const dispatch = useDispatch();
    const { appointments } = useSelector((state) => state.appointment);
    const { user } = useSelector((state) => state.auth);

    const handleTabChange = (e, newValue) => {
        setActiveTab(statusTabs[newValue]);
    };

    const filteredAppointments = appointments?.filter(
        (apt) => apt.status === activeTab
    );

    useEffect(() => {
        if (user?.role === "patient") {
            dispatch(getOwnAppointments());
        } else if (user?.role === "doctor") {
            dispatch(getAllDoctorAppointments());
        } else {
            dispatch(getAllAppointments());
        }
    }, [dispatch]);

    const updateAppointmentStatusHandler = (id, status) => {
        if (user?.role === "patient") {
            dispatch(cancelAppointment(id));
        } else {
            dispatch(updateAppointmentStatus({ id, status }));
        }
    };

    return (
        <Box width="100%">
            <Tabs
                value={statusTabs.indexOf(activeTab)}
                onChange={handleTabChange}
            >
                {statusTabs.map((status) => (
                    <Tab label={status.toUpperCase()} key={status} />
                ))}
            </Tabs>

            <Box mt={1} p={1}>
                {filteredAppointments?.length === 0 ? (
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        variant="h6"
                        mt={3}
                    >
                        No {activeTab} appointments.
                    </Typography>
                ) : (
                    filteredAppointments?.map((apt) => (
                        <Card
                            key={apt._id}
                            sx={{
                                mb: 1,
                                boxShadow: 3,
                                borderRadius: 3,
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <CardContent>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    flexWrap="wrap"
                                    width="100%"
                                >
                                    {/* Patient */}
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                        minWidth="20%"
                                    >
                                        <Avatar
                                            src={apt.patient?.profileImage}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                mx: 2,
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle2">
                                                Patient
                                            </Typography>
                                            <Typography fontWeight={600}>
                                                {apt.patientId?.name}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Doctor */}
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                        minWidth="25%"
                                    >
                                        <Avatar
                                            src={apt.doctor?.profileImage}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                mr: 2,
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle2">
                                                Doctor
                                            </Typography>
                                            <Typography fontWeight={600}>
                                                {apt.doctorId?.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {apt.doctorId?.specialization}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Date and Time */}
                                    <Box minWidth="20%">
                                        <Typography variant="h6">
                                            Appointment
                                        </Typography>
                                        <Typography>
                                            Date: {apt.date.split("T")[0]}
                                        </Typography>
                                        <Typography>
                                            Time: {apt.time}
                                        </Typography>
                                    </Box>

                                    {/* Actions */}
                                    <Box display="flex" gap={1} minWidth="15%">
                                        {((user?.role === "doctor" ||
                                            user?.role === "admin") &&
                                            apt.status !== "confirmed") && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={
                                                        <CheckCircleIcon />
                                                    }
                                                    onClick={() =>
                                                        updateAppointmentStatusHandler(
                                                            apt._id,
                                                            "confirmed"
                                                        )
                                                    }
                                                >
                                                    Confirm
                                                </Button>
                                            )}
                                        {((user?.role === "doctor" ||
                                            user?.role === "admin") &&
                                            apt.status !== "completed") && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<DoneAllIcon />}
                                                    onClick={() =>
                                                        updateAppointmentStatusHandler(
                                                            apt._id,
                                                            "completed"
                                                        )
                                                    }
                                                >
                                                    Complete
                                                </Button>
                                            )}
                                        {apt.status !== "cancelled" && (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                startIcon={<CancelIcon />}
                                                onClick={() =>
                                                    updateAppointmentStatusHandler(
                                                        apt._id,
                                                        "cancelled"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
    );
}
