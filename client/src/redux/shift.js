import { setShifts, addShift, editShift, loadingShifts } from './shiftSlice';
import axios from 'axios';
import store from './store';

const api = process.env.REACT_APP_API_URL;

/**
 * @description Fetches all shifts
 */
export const GetShifts = async () => {
    store.dispatch(loadingShifts);
    await axios
        .get(`${api}/shift`, {
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'content-type': 'application/json',
            },
        })
        .then((res) => store.dispatch(setShifts(res.data)))
        .catch((err) => console.error(err));
};

/**
 * @description Adds a shift
 * @params shift, siteId
 */
export const AddShift = async (shift, siteId) => {
    await axios
        .post(`${api}/shift/site/${siteId}`, shift, {
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'content-type': 'application/json',
            },
        })
        .then((res) => store.dispatch(addShift(res.data)))
        .catch((err) => console.error(err));
};

/**
 * @description Updates a shift
 * @params shift
 */
export const EditShift = async (shift) => {
    await axios
        .put(`${api}/shift/${shift._id}`)
        .then((res) => store.dispatch(editShift(res.data)))
        .catch((err) => console.error(err));
};

/**
 * @description Fetches all shifts for specified site
 * @params siteId
 */
export const GetShiftsBySite = async (siteId) => {};
