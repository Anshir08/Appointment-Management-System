import { Box, Button, Typography } from "@mui/material";
import DoctorProfileCard from "../components/DoctorProfileCard";
import BannerImg from "../assets/banner.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../redux/services/auth";
import Loader from "../components/Loader";

const Home = () => {
	const dispatch = useDispatch();
    const {doctors, loading} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);
    // const doctors = [
    //     {
    //         id: "1",
    //         name: "Dr. John Doe",
    //         specialization: "Cardiologist",
    //         experience: 10,
    //     },
    //     {
    //         id: "2",
    //         name: "Dr. Jane Smith",
    //         specialization: "Dermatologist",
    //         experience: 8,
    //     },
    //     {
    //         id: "3",
    //         name: "Dr. Raj Patel",
    //         specialization: "Neurologist",
    //         experience: 12,
    //     },
    //     {
    //         id: "1",
    //         name: "Dr. John Doe",
    //         specialization: "Cardiologist",
    //         experience: 10,
    //     },
    //     {
    //         id: "2",
    //         name: "Dr. Jane Smith",
    //         specialization: "Dermatologist",
    //         experience: 8,
    //     },
    //     {
    //         id: "3",
    //         name: "Dr. Raj Patel",
    //         specialization: "Neurologist",
    //         experience: 12,
    //     },
    //     {
    //         id: "1",
    //         name: "Dr. John Doe",
    //         specialization: "Cardiologist",
    //         experience: 10,
    //     },
    //     {
    //         id: "2",
    //         name: "Dr. Jane Smith",
    //         specialization: "Dermatologist",
    //         experience: 8,
    //     },
    //     {
    //         id: "3",
    //         name: "Dr. Raj Patel",
    //         specialization: "Neurologist",
    //         experience: 12,
    //     },
    // ];


    const viewDoctors = () => {
        const section = document.getElementById("doctors");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    if (loading) return <Loader/>;

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    backgroundImage: `url(${BannerImg})`, // place image in public/assets/
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                {/* Optional: dark overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    }}
                />

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h3"
                        color="white"
                        fontWeight="bold"
                        mb={4}
                        sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
                    >
                        Your Health, Our Priority
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={viewDoctors}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            textTransform: "none",
                        }}
                    >
                        Book Appointment
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{ p: 4, maxWidth: "1200px", mx: "auto", mt: 3, mb: 4 }}
                id="doctors"
            >
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    gutterBottom
                >
                    Our Doctors
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: "center",
                    }}
                >
                    {doctors.map((doc) => (
                        <DoctorProfileCard key={doc._id} doctor={doc} />
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default Home;
