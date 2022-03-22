import { createSlice } from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
        tickets: [],
        resolvedtickets: [],
        loading: false,
        loadingResolved: false,
    },
    reducers: {
        setTickets: (state, action) => {
            return {
                ...state,
                tickets: [...action.payload],
                loading: false,
            };
        },
        setResolvedTickets: (state, action) => {
            return {
                ...state,
                tickets: [...action.payload],
                loadingResolved: false,
            };
        },
        addTicket: (state, action) => {
            return {
                ...state,
                tickets: [...state.payload, action.payload],
                loading: false,
            };
        },
        setResolved: (state, action) => {
            return {
                ...state,
                tickets: [
                    ...state.tickets.filter(
                        (ticket) => ticket._id !== action.payload._id
                    ),
                ],
                resolvedtickets: [...state.resolvedtickets, action.payload],
                loading: false,
                loadingResolved: false,
            };
        },
        setUnresolved: (state, action) => {
            return {
                ...state,
                tickets: [...state.resolvedtickets, action.payload],
                resolvedtickets: [
                    ...state.tickets.filter(
                        (ticket) => ticket._id !== action.payload._id
                    ),
                ],
                loading: false,
                loadingResolved: false,
            };
        },
        loadingTickets: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        loadingResolvedTickets: (state) => {
            return {
                ...state,
                loadingResolved: true,
            };
        },
    },
});

export const {
    setTickets,
    setResolvedTickets,
    addTicket,
    setResolved,
    setUnresolved,
    loadingTickets,
    loadingResolvedTickets,
} = ticketSlice.actions;

export default ticketSlice.reducer;
