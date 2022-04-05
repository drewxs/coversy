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
        readNotification: (state, action) => {
            const index = state.notifications.findIndex(
                (notif) => notif._id === action.payload._id
            );
            const newArr = [...state.notifications];
            newArr[index] = action.payload;
            return {
                ...state,
                shifts: [...newArr],
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

export const { setNotifications, readNotification, loadingNotifications } =
    notifSlice.actions;

export default notifSlice.reducer;
