import { setShifts, addShift, editShift, loadingShifts } from './shiftSlice';
import axios from 'axios';
import store from './store';
import { loadingUser } from './userSlice';

const api = process.env.REACT_APP_API_URL;

export const getShifts = async () => {
    store.dispatch(loadingShifts);
    await axios
        .get(`${api}/shifts`)
        .then((res) => store.dispatch(setShifts(res.data)))
        .catch((err) => console.error(err));
};

export const addShift = async (shift) => {
    await axios
        .post(`${api}/shifts`, shift, {
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'content-type': 'application/json',
            },
        })
        .then((res) => store.dispatch(addShift(res.data)))
        .catch((err) => console.error(err));
};

export const editShift = async (shift) => {
    await axios
        .put(`${api}/shifts/${shift._id}`)
        .then((res) => store.dispatch(editShift(res.data)))
        .catch((err) => console.error(err));
};

export const getShiftsBySite = async (siteId) => {};
