import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './slice/adminSlice';
import passwordSlice from './slice/passwordSlice';
import payrollSlice from './slice/payrollSlice';
import shiftSlice from './slice/shiftSlice';
import ticketSlice from './slice/ticketSlice';
import notifSlice from './slice/notifSlice';
import userSlice from './slice/userSlice';
import verificationSlice from './slice/verificationSlice';

/**
 * Redux store configuration.
 *
 * @global
 */
const store = configureStore({
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

export default store;
