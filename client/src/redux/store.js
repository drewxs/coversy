import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
import passwordSlice from './passwordSlice';
import payrollSlice from './payrollSlice';
import shiftSlice from './shiftSlice';
import ticketSlice from './ticketSlice';
import userSlice from './userSlice';
import verificationSlice from './verificationSlice';
import notifSlice from './notifSlice';

export default configureStore({
    reducer: {
        admin: adminSlice,
        password: passwordSlice,
        payroll: payrollSlice,
        shift: shiftSlice,
        ticket: ticketSlice,
        user: userSlice,
        verification: verificationSlice,
        notification: notifSlice,
    },
});
