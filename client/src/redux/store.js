import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
import payrollSlice from './payrollSlice';
import shiftSlice from './shiftSlice';
import userSlice from './userSlice';
import ticketSlice from './ticketSlice';
import notifSlice from './notifSlice';

export default configureStore({
    reducer: {
        admin: adminSlice,
        payroll: payrollSlice,
        shift: shiftSlice,
        user: userSlice,
        ticket: ticketSlice,
        notfication: notifSlice,
    },
});
