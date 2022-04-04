import { loading, setErrors, success } from 'redux/verificationSlice';

import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

export const ConfirmUser = async (code) => {
    store.dispatch(loading());
    try {
        await axios.get(`${api}/auth/confirm/${code}`);
        store.dispatch(success());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};
