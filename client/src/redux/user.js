import { loginUser, loadingUser, setErrors, clearErrors } from './userSlice';
import axios from 'axios';

const api = 'http://localhost:5000/api';

export const loginUser = async (dispatch, user) => {
	dispatch(loadingUser());
	axios
		.post(`${api}/users/login`, user)
		.then((res) => {
			setAuthHeader(res.data.token, res.data.user._id);
			dispatch(loginUser(res.data));
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch(setErrors(err.response.data));
		});
};

const setAuthHeader = (token, id) => {
	localStorage.setItem('auth-token', token);
	localStorage.setItem('id', id);
	axios.defaults.headers.common['Authorization'] = token;
};
