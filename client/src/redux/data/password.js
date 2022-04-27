import {
  loading,
  setErrors,
  clearErrors,
  success,
  setReset,
  setResetFalse,
} from 'redux/slice/passwordSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module password_data */

/**
 * Finds a user by their password reset code.
 *
 * @function
 * @async
 * @param {string} passwordResetCode - The password reset code.
 */
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

/**
 * Sends a password reset email to a user.
 *
 * @function
 * @async
 * @param {string} email - The email of the user.
 */
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

/**
 * Resets a user's password.
 *
 * @function
 * @async
 * @param {string} passwordResetCode - The password reset code.
 * @param {string} newPassword - The new password.
 * @param {string} confirmNewPassword - The new password confirmed.
 */
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
