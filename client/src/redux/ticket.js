import {
    setTickets,
    setResolvedTickets,
    setResolved,
    setUnresolved,
    loadingTickets,
    loadingResolvedTickets,
} from 'redux/ticketSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module ticket_data */

/**
 * Fetches unresolved tickets.
 *
 * @function GetUnresolvedTickets
 */
export const GetUnresolvedTickets = () => {
    store.dispatch(loadingTickets());
    axios
        .get(`${api}/ticket/unresolved`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setTickets(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Fetches resolved tickets.
 *
 * @function GetResolvedTickets
 */
export const GetResolvedTickets = () => {
    store.dispatch(loadingResolvedTickets());
    axios
        .get(`${api}/ticket/resolved`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setResolvedTickets(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Creates a ticket.
 *
 * @function CreateTicket
 * @param {Object} ticket - The ticket to be created.
 * @param {number} ticket.type - The type of the ticket (1: Payroll issue, 2: Time-off request).
 * @param {string} ticket.message - The message of the ticket.
 */
export const CreateTicket = (ticket) => {
    store.dispatch(loadingTickets());
    axios
        .post(`${api}/ticket`, ticket, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .catch((err) => console.error(err));
};

/**
 * Resolves a Ticket.
 *
 * @function ResolveTicket
 * @param {number} ticketId - The id of the ticket to be resolved.
 */
export const ResolveTicket = (ticketId) => {
    axios
        .put(`${api}/ticket/${ticketId}/resolve`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setResolved(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Unresolves a Ticket.
 *
 * @function UnresolveTicket
 * @param {number} ticketId - The id of the ticket to be unresolved.
 */
export const UnresolveTicket = (ticketId) => {
    axios
        .put(`${api}/ticket/${ticketId}/unresolve`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setUnresolved(res.data)))
        .catch((err) => console.error(err));
};
