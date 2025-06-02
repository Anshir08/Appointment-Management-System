import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, updateUserById, deleteUserById, createDoctor } from "../services/admin";


const initialState = {
    users: [],
    user: {},
    error: "",
    loading: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateUserById.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteUserById.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload.user;
                state.users = state.users.filter((user) => user._id !== action.payload.user?._id);
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(createDoctor.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(createDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default adminSlice.reducer;