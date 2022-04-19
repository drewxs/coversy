import {
    setUsers,
    activateUser,
    loadingUsers,
    updateUser,
    setErrors,
    clearErrors,
    openEditUser,
    openEditShift,
    openShiftUpload,
    incrementShiftCount,
    incrementShiftErrorCount,
    clearShiftUpload,
} from 'redux/adminSlice';
import { editShift } from 'redux/shiftSlice';
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

/** @module admin_data */

/**
 * Fetches all users.
 *
 * @function
 * @async
 * @param {string} siteId - The object id of the site to fetch users for.
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
 * @function
 * @async
 * @param {string} userId - The object id of the user.
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
 * @function
 * @async
 * @param {string} userId - The object id of the user.
 * @param {Object} user - Object containing user field to be updated.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {number} user.hourlyRate - The hourly rate of the user.
 * @param {number} user.taxRate - The tax rate of the user.
 */
export const UpdateUserAsAdmin = async (userId, user) => {
    try {
        const res = await axios.put(`${api}/user/${userId}/admin`, user, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
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
 * @function
 * @async
 * @param {Object} site - Object containing site fields to be updated.
 * @param {string} site.name - The name of the site.
 * @param {Object} site.address - The address of the site.
 * @param {string} site.address.street - The street address of the site.
 * @param {string} site.address.city - The city of the site address.
 * @param {string} site.address.postalCode - The postal code of the site address.
 * @param {string} site.address.province - The province of the site address.
 */
export const UpdateSite = async (site) => {
    try {
        const res = await axios.put(`${api}/site`, site, {
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
 * @function
 * @async
 * @param {Object} shift
 * @param {string} shift.teacher - The email of the user assigned to the shift.
 * @param {string} shift.startTime - The start time of the shift.
 * @param {string} shift.endTime - The end time of the shift.
 * @param {string} shift.subject - The subject of the shift.
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
 * Edits a shift.
 *
 * @function
 * @async
 * @param {Object} shift - Object containing shift fields to be updated.
 * @param {string} shift.subject  - Subject of the shift.
 * @param {string} shift.teacher - Object id of the teacher.
 * @param {Date} shift.startTime - Start time of the shift.
 * @param {Date} shift.endTime - End time of the shift.
 */
export const EditShift = async (shift) => {
    try {
        const res = await axios.put(`${api}/shift/${shift._id}`, shift, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(clearErrors());
        store.dispatch(editShift(res.data));
        store.dispatch(openEditShift(false));
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};

/**
 * Sets open/close state of the edit user modal.
 *
 * @function
 * @param {boolean} open - Whether to set the modal to open or closed.
 */
export const SetOpenEditUser = (open) => {
    store.dispatch(openEditUser(open));
    store.dispatch(clearErrors());
};

/**
 * Sets open/close state of the edit shift modal.
 *
 * @function
 * @param {boolean} open - Whether to set the modal to open or closed.
 */
export const SetOpenEditShift = (open) => {
    store.dispatch(openEditShift(open));
    store.dispatch(clearErrors());
};

/**
 * Sets open/close state of the shift upload modal.
 *
 * @function
 * @param {boolean} open - Whether to set the modal to open or closed.
 */
export const SetOpenShiftUpload = (open) => {
    !open && store.dispatch(clearShiftUpload());
    store.dispatch(openShiftUpload(open));
};
