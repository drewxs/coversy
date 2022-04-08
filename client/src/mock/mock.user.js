import { createSlice } from '@reduxjs/toolkit';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA4YjgxZmRjMWEyMWUxMjc2MzFkNGUiLCJ0eXBlIjoxLCJzaXRlIjoiNjIwOGI4MWVkYzFhMjFlMTI3NjMxZDRjIiwiaWF0IjoxNjQ2NzU4MDUzfQ.UE2F4eGybDngdJdcuQXxTgb7fCPnXmLvxvAAHiJjK4Y';

export const mockUserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        sites: [],
        token: token,
        authenticated: false,
        loading: true,
        success: false,
        errors: null,
        updateErrors: null,
    },
    reducers: {
        loginUser: (state, action) => {
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                errors: null,
                authenticated: true,
            };
        },
        registerUser: (state) => {
            return {
                ...state,
                errors: null,
            };
        },
        registerSite: (state) => {
            return {
                ...state,
                errors: null,
            };
        },
        setUser: (state, action) => {
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        },
        editUser: (state, action) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        loadingUser: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        logoutUser: (state) => {
            return {
                ...state,
                user: {},
                token: '',
                authenticated: false,
                success: false,
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
        success: (state) => {
            return {
                ...state,
                success: true,
            };
        },
        setSites: (state, action) => {
            return {
                ...state,
                sites: action.payload,
            };
        },
    },
});

export const {
    loginUser,
    registerUser,
    registerSite,
    setUser,
    editUser,
    loadingUser,
    logoutUser,
    setErrors,
    clearErrors,
    setUpdateErrors,
    clearUpdateErrors,
    success,
    setSites,
} = mockUserSlice.actions;

export default mockUserSlice.reducer;
