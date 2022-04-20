import { loading, setErrors, success } from 'redux/slices/verificationSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module verification_data */

/**
 * Confirms a user's email address.
 *
 * @function
 * @async
 * @param {string} code - The code sent to the user's email address.
 */
export const ConfirmUser = async (code) => {
    store.dispatch(loading());
    try {
        await axios.get(`${api}/auth/confirm/${code}`);
        store.dispatch(success());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};
