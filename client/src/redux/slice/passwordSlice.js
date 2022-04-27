import { createSlice } from '@reduxjs/toolkit';

/**
 * Password Redux slice. Contains initial state and reducers for password.
 *
 * @global
 */
export const passwordSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success: false,
    errors: null,
    reset: true,
  },
  reducers: {
    loading: (state) => {
      return {
        ...state,
        loading: true,
        success: false,
      };
    },
    setErrors: (state, action) => {
      return {
        ...state,
        errors: action.payload,
        loading: false,
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
    setReset: (state) => {
      return {
        ...state,
        reset: true,
        loading: false,
      };
    },
    setResetFalse: (state) => {
      return {
        ...state,
        reset: false,
        loading: false,
      };
    },
  },
});

export const {
  loading,
  setErrors,
  clearErrors,
  success,
  setReset,
  setResetFalse,
} = passwordSlice.actions;

export default passwordSlice.reducer;
