import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import adminSlice from './adminSlice';

export default configureStore({
	reducer: {
		userSlice: userSlice,
		adminSlice: adminSlice,
	},
});
