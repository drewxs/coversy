import { setShifts, addShift, editShift, loadingShifts } from './shiftSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/**
 * Test comment for pull request from Johnny's branch to master branch
 */

/**
 * @description Fetches all shifts
 */
export const GetShifts = async () => {
    store.dispatch(loadingShifts);
    await axios
        .get(`${api}/shift`, {
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(setShifts(res.data)))
        .catch((err) => console.error(err));
};

/**
 * @description Adds a shift
 * @params shift, siteId
 */
export const AddShift = async (shift) => {
    await axios
        .post(`${api}/shift`, shift, {
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
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
