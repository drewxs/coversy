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
import { addShift } from 'redux/shiftSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/**
 * Fetches all users.
 *
 * @param {ObjectId} siteId
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
 * Toggle user active status.
 *
 * @param {ObjectId} userId
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
 * Updates a user.
 *
 * @param {ObjectId} userId,
 * @param {Object} updateQuery used to update the user
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
 * Updates site details.
 *
 * @param {Object} updateQuery used to update the site
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
 * Adds a shift.
 *
 * @param {Object} shift
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

/**
 * Sets open/close state of the edit user modal.
 *
 * @param {boolean} open
 */
export const SetOpenEditUser = (open) => {
    store.dispatch(openEditUser(open));
    store.dispatch(clearErrors());
};

/**
 * Sets open/close state of the shift upload modal.
 *
 * @param {boolean} open
 */
export const SetOpenShiftUpload = (open) => {
    !open && store.dispatch(clearShiftUpload());
    store.dispatch(openShiftUpload(open));
};
