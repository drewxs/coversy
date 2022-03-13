import { setUsers, activateUser, loadingUsers } from './adminSlice';
import axios from 'axios';
import store from './store';

const api = process.env.REACT_APP_API_URL;

export const FetchUsers = async (siteId) => {
    store.dispatch(loadingUsers());
    axios
        .get(`${api}/user/site/${siteId}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setUsers(res.data)))
        .catch((err) => console.log(err));
};

export const ToggleUserActivatedById = async (userId, siteId) => {
    await axios
        .put(`${api}/user/${userId}/activate`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(activateUser(res.data)))
        .catch((err) => console.log(err));
};
