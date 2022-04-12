import { createSlice } from '@reduxjs/toolkit';

export const shiftSlice = createSlice({
    name: 'shift',
    initialState: {
        shifts: [],
        myShifts: [],
        myPostedShifts: [],
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
        setMyShifts: (state, action) => {
            return {
                ...state,
                myShifts: [...action.payload],
                loading: false,
            };
        },
        setMyPostedShifts: (state, action) => {
            return {
                ...state,
                myPostedShifts: [...action.payload],
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
        postShift: (state, action) => {
            return {
                ...state,
                myShifts: [
                    ...state.myShifts.filter(
                        (shift) => shift._id !== action.payload._id
                    ),
                ],
                myPostedShifts: [...state.myPostedShifts, action.payload],
            };
        },
        unpostShift: (state, action) => {
            return {
                ...state,
                myShifts: [...state.myShifts, action.payload],
                myPostedShifts: [
                    ...state.myPostedShifts.filter(
                        (shift) => shift._id !== action.payload._id
                    ),
                ],
            };
        },
    },
});

export const {
    setShifts,
    setMyShifts,
    setMyPostedShifts,
    addShift,
    editShift,
    loadingShifts,
    postShift,
    unpostShift,
} = shiftSlice.actions;

export default shiftSlice.reducer;
