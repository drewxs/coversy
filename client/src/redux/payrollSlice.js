import { createSlice } from '@reduxjs/toolkit';

export const payrollSlice = createSlice({
    name: 'payroll',
    initialState: {
        payrolls: [],
        payroll: {},
        loading: false,
    },
    reducers: {
        setPayrolls: (state, action) => {
            return {
                ...state,
                payrolls: action.payload,
                loading: false,
            };
        },
        setPayroll: (state, action) => {
            return {
                ...state,
                payroll: action.payload,
                loading: false,
            };
        },
        loadingPayrolls: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
    },
});

export const { setPayrolls, setPayroll, loadingPayrolls } =
    payrollSlice.actions;

export default payrollSlice.reducer;
