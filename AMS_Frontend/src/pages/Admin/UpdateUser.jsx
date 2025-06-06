import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUserById } from "../../redux/services/admin"; // adjust path
import { data, useParams } from "react-router-dom";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { user, loading, error } = useSelector((state) => state.admin);


    const [form, setForm] = useState({});

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        dispatch(getUserById(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                ...(user.role === "doctor" && {
                    specialization: user.specialization,
                    experience: user.experience,
                }),
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        const id = params.id;
        const resultAction = await dispatch(updateUserById({id, data: form}));
        if (updateUserById.fulfilled.match(resultAction)) {
            setSuccessMessage("User updated successfully!");
            // setForm(initialForm);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" mt={4} mb={2}>
                Update User
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                {user?.role === "doctor" && (
                    <>
                        <TextField
                            label="Specialization"
                            name="specialization"
                            fullWidth
                            margin="normal"
                            value={form.specialization}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Experience"
                            name="experience"
                            fullWidth
                            margin="normal"
                            value={form.experience}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {successMessage && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {successMessage}
                    </Alert>
                )}

                <Box mt={3} mb={4}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Update User"
                        )}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UpdateUser;
