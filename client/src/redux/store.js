import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import adminSlice from './adminSlice';
import shiftSlice from './shiftSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        admin: adminSlice,
        shift: shiftSlice,
    },
});
