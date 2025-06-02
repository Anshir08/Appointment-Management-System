import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get all users by role
export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (role, thunkAPI) => {
        try {
            const response = await axios.get(
                `https://appointment-management-system-2eix.onrender.com/api/admin/users?role=${role}`,
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

// get user by id
export const getUserById = createAsyncThunk(
    "admin/getUserById",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(
                `https://appointment-management-system-2eix.onrender.com/api/admin/users/${id}`,
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


// update user by id
export const updateUserById = createAsyncThunk(
    "admin/updateUserById",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await axios.put(
                `https://appointment-management-system-2eix.onrender.com/api/admin/users/${id}`,
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


// delete user by id
export const deleteUserById = createAsyncThunk(
    "admin/deleteUserById",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `https://appointment-management-system-2eix.onrender.com/api/admin/users/${id}`,
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


// create doctor
export const createDoctor = createAsyncThunk(
    "admin/createDoctor",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(
                "https://appointment-management-system-2eix.onrender.com/api/admin/doctor",
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