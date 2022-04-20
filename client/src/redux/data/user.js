import {
    loginUser,
    registerUser,
    registerSite,
    setUser,
    editUser,
    loadingUser,
    logoutUser,
    setErrors,
    clearErrors,
    success,
    clearSuccess,
    setSites,
    setEditOpen,
    setEditErrors,
    clearEditErrors,
} from 'redux/slices/userSlice';
import axios from 'axios';
import store from 'redux/store';

const api = process.env.REACT_APP_API_URL;

/** @module user_data */

/**
 * Logs in an existing user.
 *
 * @function
 * @async
 * @param {Object} user - User object with fields used to login.
 * @param {string} user.email - The user's email.
 * @param {string} user.password - The user's password.
 */
export const LoginUser = async (user) => {
    store.dispatch(loadingUser());
    store.dispatch(clearSuccess());
    try {
        const res = await axios.post(`${api}/auth/login`, user);
        setAuthorizationHeader(res.data.token, res.data.user._id);
        store.dispatch(clearErrors());
        store.dispatch(success());
        store.dispatch(loginUser(res.data));
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};

/**
 * Registers a new user.
 *
 * @function
 * @async
 * @param {Object} data - Object with fields used to register a user.
 * @param {string} data.firstName - The user's first name.
 * @param {string} data.lastName - The user's last name.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @param {string} data.site - Object id of the site being registered to.
 */
export const RegisterUser = async (data) => {
    store.dispatch(loadingUser());
    store.dispatch(clearSuccess());
    try {
        await axios.post(`${api}/auth/register/user`, data);
        store.dispatch(clearErrors());
        store.dispatch(success());
        store.dispatch(registerUser());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};

/**
 * Registers a new site.
 *
 * @function
 * @async
 * @param {Object} data - Object with fields used to register a site.
 * @param {string} data.name - The name of the site.
 * @param {Object} data.address - The address of the site.
 * @param {string} data.address.street - The street address of the site.
 * @param {string} data.address.city - The city of the site address.
 * @param {string} data.address.postalCode - The postal code of the site address.
 * @param {string} data.address.province - The province of the site address.
 * @param {string} data.email - The email registered to the site admin.
 * @param {string} data.password - The password registered to the site admin.
 */
export const RegisterSite = async (data) => {
    store.dispatch(loadingUser());
    store.dispatch(clearSuccess());
    try {
        await axios.post(`${api}/auth/register/site`, data);
        store.dispatch(clearErrors());
        store.dispatch(success());
        store.dispatch(registerSite());
    } catch (err) {
        store.dispatch(setErrors(err.response.data));
    }
};

/**
 * Fetches site data used for registration.
 *
 * @function
 * @async
 */
export const FetchSites = async () => {
    try {
        const res = await axios.get(`${api}/site`);
        store.dispatch(setSites(res.data));
    } catch (err) {
        console.log(err);
    }
};

/**
 * Fetches the user's data.
 *
 * @function
 * @async
 */
export const LoadUser = async () => {
    store.dispatch(loadingUser());
    try {
        const res = await axios.get(
            `${api}/user/${localStorage.getItem('id')}`,
            { headers: { 'auth-token': localStorage.getItem('auth-token') } }
        );
        store.dispatch(setUser(res.data));
    } catch (err) {
        console.error(err);
    }
};

/**
 * Logs out the user of their session.
 *
 * @function
 */
export const LogoutUser = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('id');
    store.dispatch(logoutUser());
};

/**
 * Updates the user's profile picture.
 *
 * @function
 * @async
 * @param {Object} image - The image to be uploaded.
 */
export const UpdateProfilePicture = async (image) => {
    const formData = new FormData();
    formData.append('avatar', image);

    try {
        const res = await axios.put(
            `${api}/user/${localStorage.getItem('id')}/updatepicture`,
            formData,
            {
                headers: {
                    'content-type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                },
            }
        );
        store.dispatch(editUser(res.data));
    } catch (err) {
        console.log(err);
    }
};

/**
 * Updates the user's profile information.
 *
 * @function
 * @async
 * @param {Object} updateQuery - Object containing the fields to be updated.
 * @param {string} updateQuery.firstName - The user's first name.
 * @param {string} updateQuery.lastName - The user's last name.
 */
export const UpdateUser = async (updateQuery) => {
    store.dispatch(clearErrors());
    try {
        const res = await axios.put(
            `${api}/user/${localStorage.getItem('id')}`,
            updateQuery,
            { headers: { 'auth-token': localStorage.getItem('auth-token') } }
        );
        store.dispatch(clearEditErrors());
        store.dispatch(setEditOpen(false));
        store.dispatch(editUser(res.data));
    } catch (err) {
        store.dispatch(setEditErrors());
    }
};

/**
 * Sets the open/close state of the edit user details modal.
 *
 * @function
 * @param {boolean} open - The open/close state of the modal.
 */
export const SetEditOpen = (open) => {
    store.dispatch(setEditOpen(open));
    store.dispatch(clearEditErrors());
};

/**
 * Sets the default authorization headers for axios.
 *
 * @param {string} token - The user's authorization token.
 * @param {string} id - The user's id.
 */
const setAuthorizationHeader = (token, id) => {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('id', id);
};
