import {
    setNotifications,
    readNotifications,
    loadingNotifications,
} from 'redux/notifSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

export const GetNotifications = async () => {
    store.dispatch(loadingNotifications);
    await axios
        .get(`${api}/notification`, {
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(setNotifications(res.data)))
        .catch((err) => console.error(err));
};
export const ReadNotifications = async () => {
    store.dispatch(loadingNotifications);
    await axios
        .put(`${api}/notification`, null, {
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(readNotifications(res.data)))
        .catch((err) => console.error(err));
};
