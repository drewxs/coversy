import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
		users: [],
		loadingUsers: true,
	},
	reducers: {
		setUsers: (state, action) => {
			return {
				...state,
				users: action.payload,
			};
		},
		activateUser: (state, action) => {
			return {
				users: state.users.map((user, i) =>
					user._id === action.payload._id
						? { ...user, ...action.payload }
						: user
				),
			};
		},
		loadingUsers: (state) => {
			return {
				...state,
				loading: true,
			};
		},
	},
});

export const { setUsers, activateUser } = adminSlice.actions;

export default adminSlice.reducer;
