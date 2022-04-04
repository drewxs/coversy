import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './adminSlice';
import passwordSlice from './passwordSlice';
import payrollSlice from './payrollSlice';
import shiftSlice from './shiftSlice';
import ticketSlice from './ticketSlice';
import userSlice from './userSlice';

export default configureStore({
    reducer: {
        admin: adminSlice,
        auth: passwordSlice,
        payroll: payrollSlice,
        shift: shiftSlice,
        user: userSlice,
        ticket: ticketSlice,
    },
});
