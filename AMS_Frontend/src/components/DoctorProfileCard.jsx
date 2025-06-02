import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Button,
    Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import doctorImg from "../assets/doctor.jpg";

const DoctorProfileCard = ({ doctor }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: 300,
                p: 2,
                borderRadius: 5,
                backgroundColor: "#f5f5f5",
                boxShadow: 3,
                m: 2,
            }}
        >
            <Stack direction="column" spacing={2} alignItems="center">
                <Avatar sx={{ width: 100, height: 100 }} src={doctorImg} />
                <div style={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold">
                        {doctor.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {doctor.specialization}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {doctor.experience || 'X'} years of experience
                    </Typography>
                </div>
            </Stack>

            <CardContent sx={{ pt: 2 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontStyle="italic"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    sx={{ fontWeight: "bold", textTransform: "none", py: 1 }}
                    onClick={() => navigate(`/appointments/book/doctor/${doctor._id}`)}
                    
                >
                    Book Appointment
                </Button>
            </CardActions>
        </Card>
    );
};

export default DoctorProfileCard;
