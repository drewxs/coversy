import { createSlice } from '@reduxjs/toolkit';

export const notifSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        loading: false,
    },
    reducers: {
        setNotifications: (state, action) => {
            return {
                ...state,
                notifications: [...action.payload],
                loading: false,
            };
        },
        loadingNotifications: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
    },
});

export const { setNotifications, loadingNotifications } = notifSlice.actions;

export default notifSlice.reducer;
