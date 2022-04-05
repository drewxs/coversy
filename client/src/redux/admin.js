import {
    setUsers,
    activateUser,
    loadingUsers,
    updateUser,
    setErrors,
    clearErrors,
    openEditUser,
} from 'redux/adminSlice';
import { setEditOpen, setEditErrors, clearEditErrors } from 'redux/userSlice';
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
    store.dispatch(clearErrors());
    try {
        const res = await axios.put(
            `${api}/user/${userId}/admin`,
            updateQuery,
            { headers: { 'auth-token': localStorage.getItem('auth-token') } }
        );
        store.dispatch(clearErrors());
        store.dispatch(updateUser(res.data));
        store.dispatch(openEditUser(false));
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};

export const UpdateSite = async (updateQuery) => {
    store.dispatch(clearEditErrors());
    try {
        const res = await axios.put(`${api}/site`, updateQuery, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(clearEditErrors());
        store.dispatch(setEditOpen(false));
        store.dispatch(editSite(res.data));
    } catch (err) {
        store.dispatch(setEditErrors());
    }
};

export const SetOpenEditUser = (open) => {
    store.dispatch(openEditUser(open));
};
