import {
    setShifts,
    setMyShifts,
    setMyPostedShifts,
    editShift,
    editMyShift,
    editMyPostedShift,
    loadingShifts,
    postShift,
    unpostShift,
    takeShift,
    returnShift,
} from 'redux/shiftSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module shift_data */

/**
 * Fetches shifts.
 *
 * @function
 */
export const GetShifts = () => {
    store.dispatch(loadingShifts);
    axios
        .get(`${api}/shift`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setShifts(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Fetches all posted shifts (excluding user's own shifts).
 *
 * @function
 */
export const GetPostedShifts = () => {
    store.dispatch(loadingShifts);
    axios
        .get(`${api}/shift/posted`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(setShifts(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Fetches all user's shifts.
 *
 * @function
 */
export const GetMyShifts = () => {
    store.dispatch(loadingShifts);
    axios
        .get(`${api}/shift/user`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => {
            store.dispatch(
                setMyShifts(res.data.filter((shift) => !shift.posted))
            );
            store.dispatch(
                setMyPostedShifts(res.data.filter((shift) => shift.posted))
            );
        })
        .catch((err) => console.error(err));
};

/**
 * Edits a shift.
 *
 * @function
 * @param {Object} shift - Object containing shift fields to be updated.
 */
export const EditShift = (shift) => {
    axios
        .put(`${api}/shift/${shift._id}`, shift, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => store.dispatch(editShift(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Updates a shifts materials.
 *
 * @function
 * @param {string} shiftId - The object id of the shift.
 * @param {string} file - The file to be uploaded.
 */
export const UploadShiftMaterials = (shiftId, file) => {
    const formData = new FormData();
    formData.append('materials', file);

    axios
        .put(`${api}/shift/${shiftId}/files/upload`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => {
            res.data.posted
                ? store.dispatch(editMyPostedShift(res.data))
                : store.dispatch(editMyShift(res.data));
        })
        .catch((err) => console.error(err));
};

/**
 * Deletes a single shift material.
 *
 * @function
 * @param {Object} shiftId - The parent shift object of the file to be deleted.
 * @param {string} fileKey - The key of the file to be deleted.
 */
export const DeleteShiftMaterials = (shiftId, fileKey) => {
    axios
        .delete(`${api}/shift/${shiftId}/files/${fileKey}`, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        })
        .then((res) => {
            if (res.data.posted) {
                store.dispatch(editMyPostedShift(res.data));
            } else {
                store.dispatch(editMyShift(res.data));
            }
        })
        .catch((err) => console.error(err));
};

/**
 * Posts a shift.
 *
 * @function* @async
 * @param {string} shiftId - The object id of the shift.
 */
export const PostShift = async (shiftId) => {
    try {
        const shift = await axios.put(`${api}/shift/${shiftId}/post`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(postShift(shift.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Unposts a shift.
 *
 * @function
 * @async
 * @param {string} shiftId - The object id of the shift.
 */
export const UnpostShift = async (shiftId) => {
    try {
        const shift = await axios.put(`${api}/shift/${shiftId}/unpost`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(unpostShift(shift.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Takes a shift.
 *
 * @function
 * @async
 * @param {string} shiftId - The object id of the shift.
 */
export const TakeShift = async (shiftId) => {
    try {
        const shift = await axios.put(`${api}/shift/${shiftId}/take`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(takeShift(shift.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Takes a shift.
 *
 * @function
 * @async
 * @param {string} shiftId - The object id of the shift.
 */
export const ReturnShift = async (shiftId) => {
    try {
        const shift = await axios.put(`${api}/shift/${shiftId}/return`, null, {
            headers: { 'auth-token': localStorage.getItem('auth-token') },
        });
        store.dispatch(returnShift(shift.data));
    } catch (err) {
        console.error(err);
    }
};
