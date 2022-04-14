import { createSlice } from '@reduxjs/toolkit';

/** @module ticketSlice */

/**
 * Ticket Redux slice. Contains initial state and reducers for ticket.
 */
export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
        tickets: [],
        resolvedTickets: [],
        loading: false,
        loadingResolved: false,
    },
    reducers: {
        /**
         * Sets the unresolved tickets.
         *
         * @function setTickets
         * @param {Object} state - The Redux state.
         * @param {Object} action - The Redux action.
         * @returns Updated state with unresolved tickets.
         */
        setTickets: (state, action) => {
            return {
                ...state,
                tickets: [...action.payload],
                loading: false,
            };
        },
        /**
         * Sets the resolved tickets.
         *
         * @function setResolvedTickets
         * @param {Object} state - The Redux state.
         * @param {Object} action - The Redux action.
         * @returns Updated state with resolved tickets.
         */
        setResolvedTickets: (state, action) => {
            return {
                ...state,
                resolvedTickets: [...action.payload],
                loadingResolved: false,
            };
        },
        /**
         * Sets a ticket as resolved.
         *
         * @function setResolved
         * @param {Object} state - The Redux state.
         * @param {Object} action - The Redux action.
         * @returns Updated state with the ticket moved to the resolved tickets.
         */
        setResolved: (state, action) => {
            return {
                ...state,
                tickets: [
                    ...state.tickets.filter(
                        (ticket) => ticket._id !== action.payload._id
                    ),
                ],
                resolvedTickets: [...state.resolvedTickets, action.payload],
                loading: false,
                loadingResolved: false,
            };
        },
        /**
         * Sets a ticket as unresolved.
         *
         * @function setUnresolved
         * @param {Object} state - The Redux state.
         * @param {Object} action - The Redux action.
         * @returns Updated state with the ticket moved to the unresolved tickets.
         */
        setUnresolved: (state, action) => {
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
                resolvedTickets: [
                    ...state.resolvedTickets.filter(
                        (ticket) => ticket._id !== action.payload._id
                    ),
                ],
                loading: false,
                loadingResolved: false,
            };
        },
        /**
         * Sets the loading state to true.
         *
         * @function loadingTickets
         * @param {Object} state - The Redux state.
         * @returns Updated state with the loading flag set to true.
         */
        loadingTickets: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        /**
         * Sets the loadingResolved state to true.
         *
         * @function loadingResolvedTickets
         * @param {Object} state - The Redux state.
         * @returns Updated state with the loadingResolved flag set to true.
         */
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
    setResolved,
    setUnresolved,
    loadingTickets,
    loadingResolvedTickets,
} = ticketSlice.actions;

export default ticketSlice.reducer;
