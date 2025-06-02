import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createDoctor } from '../../redux/services/admin'; // adjust path

const CreateDoctor = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    experience: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const resultAction = await dispatch(createDoctor(form));
    if (createDoctor.fulfilled.match(resultAction)) {
      setSuccessMessage('Doctor created successfully!');
      setForm({
        name: '',
        email: '',
        password: '',
        specialization: '',
        experience: '',
      });
    }
    navigate('/admin/doctors');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mt={4} mb={2}>
        Create New Doctor
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
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
        />
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
            {loading ? <CircularProgress size={24} /> : 'Create Doctor'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateDoctor;
