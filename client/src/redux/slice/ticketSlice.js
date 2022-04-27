import { createSlice } from '@reduxjs/toolkit';

/**
 * Ticket Redux slice. Contains initial state and reducers for ticket.
 *
 * @global
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
        resolvedTickets: [...action.payload],
        loadingResolved: false,
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
        resolvedTickets: [...state.resolvedTickets, action.payload],
        loading: false,
        loadingResolved: false,
      };
    },
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
  setResolved,
  setUnresolved,
  loadingTickets,
  loadingResolvedTickets,
} = ticketSlice.actions;

export default ticketSlice.reducer;
