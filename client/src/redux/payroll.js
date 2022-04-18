import { setPayrolls, setPayroll, loadingPayrolls } from 'redux/payrollSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module payroll_data */

/**
 * Fetches site payrolls.
 *
 * @function
 * @async
 */
export const GetSitePayrolls = async () => {
    store.dispatch(loadingPayrolls());
    try {
        const res = await axios.get(`${api}/payroll/site`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(setPayrolls(res.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Fetches user payrolls.
 *
 * @function
 * @async
 */
export const GetUserPayrolls = async () => {
    store.dispatch(loadingPayrolls());
    try {
        const res = await axios.get(`${api}/payroll/user`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(setPayrolls(res.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Fetches a single site payroll.
 *
 * @param {string} date  - The period of the payroll (e.g. 2020-01).
 */
export const GetSitePayroll = async (date) => {
    store.dispatch(loadingPayrolls());
    try {
        const res = await axios.get(`${api}/payroll/site/${date}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(setPayroll(res.data[0]));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Fetches a single user payroll.
 *
 * @param {string} date  - The period of the payroll (e.g. 2020-01).
 */
export const GetUserPayroll = async (date) => {
    store.dispatch(loadingPayrolls());
    try {
        const res = await axios.get(`${api}/payroll/user/${date}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(setPayroll(res.data[0]));
    } catch (err) {
        console.error(err);
    }
};
