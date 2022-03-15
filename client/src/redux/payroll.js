import { setPayrolls, setPayroll, loadingPayrolls } from 'redux/payrollSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

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

export const GetSitePayroll = async (date) => {
    store.dispatch(loadingPayrolls());
    try {
        const res = await axios.get(`${api}/payroll/site/${date}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(setPayroll(res.data));
    } catch (err) {
        console.error(err);
    }
};

export const GetUserPayroll = async (date) => {
    store.dispatch(loadingPayrolls());
    try {
        const res = await axios.get(`${api}/payroll/user${date}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(setPayroll(res.data));
    } catch (err) {
        console.error(err);
    }
};
