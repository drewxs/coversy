import {
    setShifts,
    setMyShifts,
    setMyPostedShifts,
    editShift,
    loadingShifts,
    postShift,
    unpostShift,
    takeShift,
    returnShift,
} from 'redux/shiftSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/**
 * Fetches all shifts
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
 * Fetches all posted shifts (excluding user's own shifts)
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
 * Fetches all user's shifts
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
 * @description Updates a shift
 * @param {*} shift
 */

/**
 * Edits a shift
 *
 * @param {Object} shift
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
 * Updates a shifts materials
 *
 * @param {Object} shift
 */
export const UploadShiftMaterials = (shift, file) => {
    const formData = new FormData();
    formData.append('materials', file);

    axios
        .put(`${api}/shift/${shift._id}/files/upload`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(editShift(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Deletes a single shift material
 *
 * @param {Object} shift
 * @param {string} fileKey
 */
export const DeleteShiftMaterials = (shift, fileKey) => {
    axios
        .delete(`${api}/shift/${shift._id}/files/${fileKey}`, {
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
            },
        })
        .then((res) => store.dispatch(editShift(res.data)))
        .catch((err) => console.error(err));
};

/**
 * Posts a shift
 *
 * @param {ObjectId} shiftId
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
 * Unposts a shift
 *
 * @param {ObjectId} shiftId
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
 * Takes a shift
 *
 * @param {ObjectId} shiftId
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
 * Takes a shift
 *
 * @param {ObjectId} shiftId
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
