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
        clearSuccess: (state) => {
            return {
                ...state,
                success: false,
            };
        },
        setSites: (state, action) => {
            return {
                ...state,
                sites: action.payload,
            };
        },
        editSite: (state, action) => {
            let newUser = state.user;
            newUser.site = action.payload;
            return {
                ...state,
                user: newUser,
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
    clearSuccess,
    setSites,
    editSite,
} = userSlice.actions;

export default userSlice.reducer;
