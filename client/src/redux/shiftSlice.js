import { createSlice } from '@reduxjs/toolkit';

export const shiftSlice = createSlice({
    name: 'shift',
    initialState: {
        shifts: [],
        loading: false,
    },
    reducers: {
        setShifts: (state, action) => {
            return {
                ...state,
                shifts: [...action.payload],
                loading: false,
            };
        },
        addShift: (state, action) => {
            return {
                ...state,
                shifts: [...state.shifts, action.payload],
            };
        },
        editShift: (state, action) => {
            const index = state.shifts.findIndex(
                (shift) => shift._id === action.payload._id
            );
            const newArr = [...state.shifts];
            newArr[index] = action.payload;

            return {
                ...state,
                shifts: [...newArr],
            };
        },
        loadingShifts: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
    },
});

export const { setShifts, addShift, editShift, loadingShifts } =
    shiftSlice.actions;

export default shiftSlice.reducer;
