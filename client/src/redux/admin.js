import {
    setUsers,
    activateUser,
    loadingUsers,
    updateUser,
    setErrors,
    clearErrors,
    openEditUser,
    openShiftUpload,
    incrementShiftCount,
    incrementShiftErrorCount,
    clearShiftUpload,
} from 'redux/adminSlice';
import {
    setEditOpen,
    setEditErrors,
    clearEditErrors,
    editSite,
} from 'redux/userSlice';
import { addShift } from './shiftSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/**
 * @description Fetches all users
 * @params siteId
 */
export const FetchUsers = async (siteId) => {
    store.dispatch(loadingUsers());
    axios
        .get(`${api}/user/site/${siteId}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setUsers(res.data)))
        .catch((err) => console.log(err));
};

/**
 * @description Toggle user active status
 * @params userId
 */
export const ToggleUserActivatedById = async (userId) => {
    await axios
        .put(`${api}/user/${userId}/activate`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(activateUser(res.data)))
        .catch((err) => console.log(err));
};

/**
 * @description Updates a user
 * @params userId, updateQuery
 */
export const UpdateUserAsAdmin = async (userId, updateQuery) => {
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

/**
 * @description Updates site details
 * @params updateQuery
 */
export const UpdateSite = async (updateQuery) => {
    try {
        const res = await axios.put(`${api}/site`, updateQuery, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(clearEditErrors());
        store.dispatch(editSite(res.data));
        store.dispatch(setEditOpen(false));
    } catch (err) {
        store.dispatch(setEditErrors(err.response.data));
    }
};

/**
 * @description Adds a shift
 * @params shift
 */
export const AddShift = async (shift) => {
    try {
        const res = await axios.post(`${api}/shift`, shift, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(addShift(res.data));
        store.dispatch(incrementShiftCount());
    } catch (err) {
        store.dispatch(incrementShiftErrorCount());
    }
};

export const SetOpenEditUser = (open) => {
    store.dispatch(openEditUser(open));
    store.dispatch(clearErrors());
};

export const SetOpenShiftUpload = (open) => {
    !open && store.dispatch(clearShiftUpload());
    store.dispatch(openShiftUpload(open));
};
