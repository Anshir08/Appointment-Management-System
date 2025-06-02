import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// signup
export const registerPatient = createAsyncThunk(
    "user/signup",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(
                "https://appointment-management-system-2eix.onrender.com/api/auth/register",
                data,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// login
export const loginUser = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(
                "https://appointment-management-system-2eix.onrender.com/api/auth/login",
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

export const getAllDoctors = createAsyncThunk(
    "user/getAllDoctors",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                "https://appointment-management-system-2eix.onrender.com/api/auth/doctors",
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

export const getSingleDoctor = createAsyncThunk(
    "user/getSingleDoctor",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(
                `https://appointment-management-system-2eix.onrender.com/api/auth/doctors/${id}`,
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

// logout
export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "https://appointment-management-system-2eix.onrender.com/api/auth/logout",
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getMyProfile = createAsyncThunk(
    "user/getMyProfile",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                "https://appointment-management-system-2eix.onrender.com/api/auth/me",
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
