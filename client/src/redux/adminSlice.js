import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        loadingUsers: true,
        errors: null,
        openEditUser: false,
        openShiftUpload: false,
        shiftCount: 0,
        shiftErrorCount: 0,
    },
    reducers: {
        setUsers: (state, action) => {
            return {
                ...state,
                users: action.payload,
                loadingUsers: false,
            };
        },
        activateUser: (state, action) => {
            return {
                ...state,
                users: state.users.map((user) =>
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
        updateUser: (state, action) => {
            const index = state.users.findIndex(
                (user) => user._id === action.payload._id
            );
            const newArr = [...state.users];
            newArr[index] = action.payload;

            return {
                ...state,
                users: [...newArr],
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
        openEditUser: (state, action) => {
            return {
                ...state,
                openEditUser: action.payload,
            };
        },
        openShiftUpload: (state, action) => {
            return {
                ...state,
                openShiftUpload: action.payload,
            };
        },
        incrementShiftCount: (state) => {
            return {
                ...state,
                shiftCount: state.shiftCount + 1,
            };
        },
        incrementShiftErrorCount: (state) => {
            return {
                ...state,
                shiftErrorCount: state.shiftErrorCount + 1,
            };
        },
        clearShiftUpload: (state) => {
            return {
                ...state,
                shiftCount: 0,
                shiftErrorCount: 0,
            };
        },
    },
});

export const {
    setUsers,
    activateUser,
    loadingUsers,
    updateUser,
    setErrors,
    clearErrors,
    openEditUser,
    openShiftUpload,
    incrementShiftCount,
    incrementShiftErrorCount,
    clearShiftUpload,
} = adminSlice.actions;

export default adminSlice.reducer;
