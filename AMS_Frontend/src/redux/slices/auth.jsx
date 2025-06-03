import { createSlice } from "@reduxjs/toolkit";

import { registerPatient, loginUser, logoutUser, getAllDoctors, getSingleDoctor, getMyProfile, updateDoctorAvailability } from "../services/auth";

const initialState = {
  user: {},
  doctors: [],
  doctor: null,
  error: "",
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {};
        state.loading = false;
        state.error = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.doctors;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleDoctor.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getSingleDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.doctor;
      })
      .addCase(getSingleDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateDoctorAvailability.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateDoctorAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.doctor;
      })
      .addCase(updateDoctorAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});

export default authSlice.reducer;
