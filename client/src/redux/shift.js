import { setShifts, editShift, loadingShifts } from './shiftSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/**
 * @description Fetches all shifts
 */
export const GetShifts = async () => {
    store.dispatch(loadingShifts);
    await axios
        .get(`${api}/shift`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setShifts(res.data)))
        .catch((err) => console.error(err));
};

/**
 * @description Updates a shift
 * @params shift
 */
export const EditShift = async (shift) => {
    await axios
        .put(`${api}/shift/${shift._id}`, shift, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(editShift(res.data)))
        .catch((err) => console.error(err));
};

/**
 * @description Posts a shift
 * @params shiftId
 */
export const PostShift = async (shiftId) => {
    try {
        const shift = await axios.put(`${api}/shift/${shiftId}/post`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(editShift(shift.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * @description Unposts a shift
 * @params shiftId
 */
export const UnpostShift = async (shiftId) => {
    try {
        const shift = await axios.put(`${api}/shift/${shiftId}/unpost`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(editShift(shift.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * @description Takes a shift
 * @params shiftId
 */
export const TakeShift = async (shiftId) => {
    try {
        const shift = await axios.put(`${api}/shift/${shiftId}/take`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(editShift(shift.data));
    } catch (err) {
        console.error(err);
    }
};
