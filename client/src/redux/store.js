import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
import payrollSlice from './payrollSlice';
import shiftSlice from './shiftSlice';
import userSlice from './userSlice';
import ticketSlice from './ticketSlice';

export default configureStore({
    reducer: {
        admin: adminSlice,
        payroll: payrollSlice,
        shift: shiftSlice,
        user: userSlice,
        ticket: ticketSlice,
    },
});
