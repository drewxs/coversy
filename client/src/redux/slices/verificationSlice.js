import { createSlice } from '@reduxjs/toolkit';

/**
 * Verification Redux slice. Contains initial state and reducers for verification.
 */
export const verification = createSlice({
    name: 'verification',
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
                success: false,
                errors: null,
            };
        },
        setErrors: (state, action) => {
            return {
                ...state,
                errors: action.payload,
            };
        },
        success: (state) => {
            return {
                ...state,
                loading: false,
                success: true,
                errors: null,
            };
        },
    },
});

export const { loading, setErrors, clearErrors, success } =
    verification.actions;

export default verification.reducer;
