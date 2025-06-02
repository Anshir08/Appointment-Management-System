import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import adminSlice from './slices/admin';
import appointmentSlice from './slices/appointment';

const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice,
        appointment: appointmentSlice,
    },
});

export default store;