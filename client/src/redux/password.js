import { loading, setErrors, clearErrors, success } from 'redux/passwordSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

export const FindUserByPasswordResetCode = async (
    userId,
    passwordResetCode
) => {
    store.dispatch(loading());
    try {
        await axios.get(`${api}/${userId}/password/${passwordResetCode}`);
        store.dispatch(clearErrors());
        store.dispatch(success());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};

export const ResetPassword = async (
    passwordResetCode,
    newPassword,
    confirmNewPassword
) => {
    store.dispatch(loading());
    try {
        await axios.put(
            `${api}/auth/resetpassword/${passwordResetCode}`,
            { newPassword, confirmNewPassword },
            { headers: { 'auth-token': localStorage.getItem('auth-token') } }
        );
        store.dispatch(clearErrors());
        store.dispatch(success());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};
