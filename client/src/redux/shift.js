import { setShifts, addShift, editShift, loadingShifts } from './shiftSlice';
import axios from 'axios';
import store from './store';

const api = process.env.REACT_APP_API_URL;

export const GetShifts = async () => {
    store.dispatch(loadingShifts);
    await axios
        .get(`${api}/shifts`)
        .then((res) => store.dispatch(setShifts(res.data)))
        .catch((err) => console.error(err));
};

export const AddShift = async (shift, siteId) => {
    await axios
        .post(`${api}/shifts/${siteId}`, shift, {
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'content-type': 'application/json',
            },
        })
        .then((res) => store.dispatch(addShift(res.data)))
        .catch((err) => console.error(err));
};

export const EditShift = async (shift) => {
    await axios
        .put(`${api}/shifts/${shift._id}`)
        .then((res) => store.dispatch(editShift(res.data)))
        .catch((err) => console.error(err));
};

export const GetShiftsBySite = async (siteId) => {};
