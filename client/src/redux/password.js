import {
    loading,
    setErrors,
    clearErrors,
    success,
    setReset,
    setResetFalse,
} from 'redux/passwordSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

export const FindUserByPasswordResetCode = async (passwordResetCode) => {
    store.dispatch(loading());
    try {
        await axios.get(`${api}/user/passwordreset/${passwordResetCode}`);
        store.dispatch(setReset());
        store.dispatch(clearErrors());
    } catch (err) {
        store.dispatch(setResetFalse());
        store.dispatch(setErrors(err.response.data));
    }
};

export const RequestPasswordReset = async (email) => {
    store.dispatch(loading());
    try {
        await axios.post(`${api}/auth/forgot`, email);
        store.dispatch(clearErrors());
        store.dispatch(success());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};

export const PasswordReset = async (
    passwordResetCode,
    newPassword,
    confirmNewPassword
) => {
    store.dispatch(loading());
    try {
        await axios.put(`${api}/auth/resetpassword/${passwordResetCode}`, {
            newPassword,
            confirmNewPassword,
        });
        store.dispatch(clearErrors());
        store.dispatch(success());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};
