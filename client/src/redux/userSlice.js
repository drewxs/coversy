import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
		site: {},
		token: localStorage.getItem('auth-token'),
		authenticated: localStorage.getItem('auth-token') ? true : false,
		loading: true,
		errors: null,
		updateErrors: null,
	},
	reducers: {
		loginUser: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticated: true,
				loading: false,
			};
		},
		registerUser: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticated: true,
				loading: false,
			};
		},
		registerSite: (state, action) => {
			return {
				...state,
				user: action.payload.user,
				site: action.payload.site,
				token: action.payload.token,
				authenticated: true,
				loading: false,
			};
		},
		loadingUser: (state) => {
			return {
				...state,
				loading: true,
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
		setUpdateErrors: (state, action) => {
			return {
				...state,
				updateErrors: action.payload,
			};
		},
		clearUpdateErrors: (state) => {
			return {
				...state,
				updateErrors: null,
			};
		},
	},
});

export const {
	loginUser,
	registerUser,
	registerSite,
	loadingUser,
	setErrors,
	clearErrors,
	setUpdateErrors,
	clearUpdateErrors,
} = userSlice.actions;

export default userSlice.reducer;
