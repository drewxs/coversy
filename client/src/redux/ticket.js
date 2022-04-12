import {
    setTickets,
    setResolvedTickets,
    addTicket,
    setResolved,
    setUnresolved,
    loadingTickets,
    loadingResolvedTickets,
} from 'redux/ticketSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

export const GetUnresolvedTickets = () => {
    store.dispatch(loadingTickets());
    axios
        .get(`${api}/ticket/unresolved`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setTickets(res.data)))
        .catch((err) => console.error(err));
};

export const GetResolvedTickets = () => {
    store.dispatch(loadingResolvedTickets());
    axios
        .get(`${api}/ticket/resolved`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setResolvedTickets(res.data)))
        .catch((err) => console.error(err));
};

export const AddTicket = (ticket) => {
    store.dispatch(loadingTickets());
    axios
        .post(`${api}/ticket`, ticket, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(addTicket(res.data)))
        .catch((err) => console.error(err));
};

export const ResolveTicket = (ticket) => {
    axios
        .put(`${api}/ticket/${ticket._id}/resolve`, ticket, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setResolved(res.data)))
        .catch((err) => console.error(err));
};

export const UnresolveTicket = (ticket) => {
    axios
        .put(`${api}/ticket/${ticket._id}/unresolve`, ticket, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setUnresolved(res.data)))
        .catch((err) => console.error(err));
};
