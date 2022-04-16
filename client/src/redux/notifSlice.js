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
        readNotifications: (state) => {
            return {
                ...state,
                notifications: state.notifications.map((notification) => ({
                    ...notification,
                    read: true,
                })),
                loading: false,
            };
        },
        removeNotification: (state, action) => {
            return {
                ...state,
                notifications: [
                    ...state.notifications.filter(
                        (notificaion) => notificaion._id !== action.payload._id
                    ),
                ],
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

export const {
    setNotifications,
    readNotifications,
    removeNotification,
    loadingNotifications,
} = notifSlice.actions;

export default notifSlice.reducer;
