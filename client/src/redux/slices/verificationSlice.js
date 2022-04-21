import { createSlice } from '@reduxjs/toolkit';

/**
 * Verification Redux slice. Contains initial state and reducers for verification.
 *
 * @global
 */
export const verificationSlice = createSlice({
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
    verificationSlice.actions;

export default verificationSlice.reducer;
