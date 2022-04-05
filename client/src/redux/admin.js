import {
    setUsers,
    activateUser,
    loadingUsers,
    updateUser,
} from 'redux/adminSlice';
import { editSite } from 'redux/userSlice';
import axios from 'axios';
import store from 'redux/store';

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

export const ToggleUserActivatedById = async (userId) => {
    await axios
        .put(`${api}/user/${userId}/activate`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(activateUser(res.data)))
        .catch((err) => console.log(err));
};

export const UpdateUserAsAdmin = async (userId, updateQuery) => {
    try {
        const res = await axios.put(
            `${api}/user/${userId}/admin`,
            updateQuery,
            { headers: { 'auth-token': localStorage.getItem('auth-token') } }
        );
        store.dispatch(updateUser(res.data));
    } catch (err) {
        console.error(err.message);
    }
};

export const UpdateSite = async (updateQuery) => {
    try {
        const res = await axios.put(`${api}/site`, updateQuery, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(editSite(res.data));
    } catch (err) {
        console.error(err.message);
    }
};
