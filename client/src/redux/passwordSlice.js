import { createSlice } from '@reduxjs/toolkit';

export const password = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        success: false,
        errors: null,
    },
    reducers: {
        loading: (state) => {
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
        success: (state) => {
            return {
                ...state,
                loading: false,
                success: true,
            };
        },
    },
});

export const { loading, setErrors, clearErrors, success } = password.actions;

export default password.reducer;
