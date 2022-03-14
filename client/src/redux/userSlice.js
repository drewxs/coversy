import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        sites: [],
        token: localStorage.getItem('auth-token'),
        authenticated: localStorage.getItem('auth-token') ? true : false,
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
                loading: false,
            };
        },
        registerUser: (state) => {
            return {
                ...state,
                errors: null,
                loading: false,
            };
        },
        registerSite: (state) => {
            return {
                ...state,
                errors: null,
                loading: false,
            };
        },
        setUser: (state, action) => {
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
    loadingUser,
    logoutUser,
    setErrors,
    clearErrors,
    setUpdateErrors,
    clearUpdateErrors,
    success,
    setSites,
} = userSlice.actions;

export default userSlice.reducer;
