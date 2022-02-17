import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
	name: 'admin',
	initialState: {
		users: [],
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
				...state,
				users: state.users.map((data, i) =>
					i === 1 ? { ...data, activated: action.payload } : data
				),
			};
		},
	},
});

export const { setUsers, activateUser } = adminSlice.actions;

export default adminSlice.reducer;
