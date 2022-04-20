import { createSlice } from '@reduxjs/toolkit';

/**
 * Shift Redux slice. Contains initial state and reducers for shift.
 */
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
        editMyShift: (state, action) => {
            const index = state.myShifts.findIndex(
                (shift) => shift._id === action.payload._id
            );
            const newArr = [...state.myShifts];
            newArr[index] = action.payload;

            return {
                ...state,
                myShifts: [...newArr],
            };
        },
        editMyPostedShift: (state, action) => {
            const index = state.myPostedShifts.findIndex(
                (shift) => shift._id === action.payload._id
            );
            const newArr = [...state.myPostedShifts];
            newArr[index] = action.payload;

            return {
                ...state,
                myPostedShifts: [...newArr],
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
        takeShift: (state, action) => {
            return {
                ...state,
                myShifts: [...state.myShifts, action.payload],
                shifts: [
                    ...state.shifts.filter(
                        (shift) => shift._id !== action.payload._id
                    ),
                ],
            };
        },
        returnShift: (state, action) => {
            return {
                ...state,
                myShifts: [
                    ...state.myShifts.filter(
                        (shift) => shift._id !== action.payload._id
                    ),
                ],
                shifts: [...state.shifts, action.payload],
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
    editMyShift,
    editMyPostedShift,
    loadingShifts,
    postShift,
    unpostShift,
    takeShift,
    returnShift,
} = shiftSlice.actions;

export default shiftSlice.reducer;
