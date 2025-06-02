import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// for patients
export const createAppointment = createAsyncThunk(
  "patient/createAppointment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/appointments",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOwnAppointments = createAsyncThunk(
  "patient/getOwnAppointments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/appointments",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "patient/cancelAppointment",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/appointments/${id}/cancel`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// for guests
export const guestBooksAppointment = createAsyncThunk(
  "guest/guestBooksAppointment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/appointments/guest",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const guestViewsAppointment = createAsyncThunk(
  "guest/guestViewsAppointment",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/appointments/guest",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const guestCancelsAppointment = createAsyncThunk(
  "guest/guestCancelsAppointment",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/appointments/guest/${id}/cancel`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// for doctors
export const getAllDoctorAppointments = createAsyncThunk(
  "doctor/getAllDoctorAppointments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/appointments/doctor",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "doctor/updateAppointmentStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      console.log(id, status);
      const response = await axios.put(
        `http://localhost:3000/api/appointments/doctor/${id}/status`,
        {status},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// for admins
export const getAllAppointments = createAsyncThunk(
  "admin/getAllAppointments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/appointments/admin",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAnyAppointment = createAsyncThunk(
  "admin/updateAppointment",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/appointments/admin/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createAppointmentForPatient = createAsyncThunk(
  "admin/createAppointmentforPatient",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/appointments/admin",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteAnyAppointment = createAsyncThunk(
  "admin/deleteAnyAppointment",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/appointments/admin/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
