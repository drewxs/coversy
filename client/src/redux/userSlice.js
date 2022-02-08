import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
		token: localStorage.getItem('auth-token'),
		authenticated: localStorage.getItem('auth-token') ? true : false,
		loadingUser: true,
		errors: null,
	},
	reducers: {
		loginUser: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticated: true,
				loadingUser: false,
			};
		},
		loadingUser: (state) => {
			return {
				...state,
				loadingUser: true,
			};
		},
		setErrors: (state, action) => {
			return {
				...state,
				errors: action.payload,
			};
		},
		clearErrors: (state) => {
			return {
				...state,
				errors: null,
			};
		},
	},
});

export const { loginUser, loadingUser, setErrors, clearErrors } =
	userSlice.actions;

export default userSlice.reducer;
