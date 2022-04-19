import {
    setNotifications,
    readNotifications,
    removeNotification,
    loadingNotifications,
} from 'redux/notifSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module notifications_data */

/**
 * Fetches notifications.
 *
 * @function
 * @async
 */
export const GetNotifications = async () => {
    store.dispatch(loadingNotifications);
    await axios
        .get(`${api}/notification`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setNotifications(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Marks all notification as read.
 *
 * @function
 * @async
 */
export const ReadNotifications = async () => {
    store.dispatch(loadingNotifications);
    await axios
        .put(`${api}/notification`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(readNotifications(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Deletes a notification.
 *
 * @function
 * @async
 * @param {string} notifId - Object id of the notification.
 */
export const DeleteNotification = async (notifId) => {
    store.dispatch(loadingNotifications);
    await axios
        .delete(`${api}/notification/${notifId}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(removeNotification(res.data)))
        .catch((err) => console.error(err));
};
