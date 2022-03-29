import {
    setNotifications,
    readNotification,
    loadingNotifications,
} from 'redux/notifSlice';
import axios from 'axios';
import store from 'redux/store';

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
export const ReadNotification = async (notification) => {
    store.dispatch(loadingNotifications);
    await axios
        .put(`${api}/notification/${notification._id}`, {
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(readNotification(res.data)))
        .catch((err) => console.error(err));
};
