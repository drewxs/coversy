import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './slices/adminSlice';
import passwordSlice from './slices/passwordSlice';
import payrollSlice from './slices/payrollSlice';
import shiftSlice from './slices/shiftSlice';
import ticketSlice from './slices/ticketSlice';
import notifSlice from './slices/notifSlice';
import userSlice from './slices/userSlice';
import verificationSlice from './slices/verificationSlice';

/**
 * Redux store configuration.
 */
export default configureStore({
    reducer: {
        admin: adminSlice,
        password: passwordSlice,
        payroll: payrollSlice,
        shift: shiftSlice,
        ticket: ticketSlice,
        notification: notifSlice,
        user: userSlice,
        verification: verificationSlice,
    },
});
