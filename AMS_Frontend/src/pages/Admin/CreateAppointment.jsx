import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAppointmentForPatient,
} from '../../redux/services/appointment'; // adjust imports accordingly
import { getAllUsers } from '../../redux/services/admin';

const CreateAppointmentForPatient = () => {
  const dispatch = useDispatch();
  const { appointment, loading, error } = useSelector((state) => state.appointment);
  const { users } = useSelector((state) => state.admin);
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    timeSlot: '',
    reason: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const patients = users.filter((user) => user.role === 'patient');
  const doctors = users.filter((user) => user.role === 'doctor');
  useEffect(() => {
    dispatch(getAllUsers('doctor'));
    dispatch(getAllUsers('patient'));
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    dispatch(createAppointmentForPatient(form));
    if (appointment) {
      setSuccessMessage('Appointment created successfully!');
      setForm({
        patientId: '',
        doctorId: '',
        timeSlot: '',
        reason: '',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mt={4} mb={2}>
        Create Appointment for Patient
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          select
          label="Select Patient"
          name="patientId"
          fullWidth
          margin="normal"
          value={form.patientId}
          onChange={handleChange}
          required
        >
          {patients?.map((p) => (
            <MenuItem key={p._id} value={p._id}>
              {p.name} ({p.email})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select Doctor"
          name="doctorId"
          fullWidth
          margin="normal"
          value={form.doctorId}
          onChange={handleChange}
          required
        >
          {doctors?.map((d) => (
            <MenuItem key={d._id} value={d._id}>
              Dr. {d.name} ({d.specialization})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Time Slot (e.g., 2:00 PM)"
          name="timeSlot"
          fullWidth
          margin="normal"
          value={form.timeSlot}
          onChange={handleChange}
          required
        />

        <TextField
          label="Reason (Optional)"
          name="reason"
          fullWidth
          margin="normal"
          value={form.reason}
          onChange={handleChange}
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

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Create Appointment'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateAppointmentForPatient;
