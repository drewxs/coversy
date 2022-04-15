import { setNotifications, loadingNotifications } from 'redux/notifSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module notifications_data */

/**
 * Fetches notifications.
 *
 * @function GetNotifications
 * @async
 */
export const GetNotifications = async () => {
    store.dispatch(loadingNotifications);
    await axios
        .get(`${api}/notification`, {
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(setNotifications(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Marks all notification as read.
 *
 * @function ReadNotifications
 * @async
 */
export const ReadNotifications = async () => {
    store.dispatch(loadingNotifications);
    await axios
        .put(`${api}/notification`, {
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(setNotifications(res.data)))
        .catch((err) => console.error(err));
};
