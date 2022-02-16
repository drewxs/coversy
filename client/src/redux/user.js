import {
	loginUser,
	registerUser,
	registerSite,
	setUser,
	loadingUser,
	logoutUser,
	setErrors,
	clearErrors,
	// setUpdateErrors,
	// clearUpdateErrors,
	setSites,
} from './userSlice';
import axios from 'axios';
import store from './store';

const api = process.env.REACT_APP_API_URL;

export const LoginUser = async (user) => {
	store.dispatch(loadingUser());

	await axios
		.post(`${api}/auth/login`, user)
		.then((res) => {
			setAuthorizationHeader(res.data.token, res.data.user._id);
			store.dispatch(loginUser(res.data));
			store.dispatch(clearErrors());
		})
		.catch((err) => {
			store.dispatch(setErrors(err.response.data));
		});
};

export const RegisterUser = async (data) => {
	store.dispatch(loadingUser());

	await axios
		.post(`${api}/auth/register/user`, data)
		.then((res) => {
			setAuthorizationHeader(res.data.token, res.data.user._id);
			store.dispatch(registerUser(res.data));
			store.dispatch(clearErrors());
		})
		.catch((err) => store.dispatch(setErrors(err.response.data)));
};

export const RegisterSite = async (data) => {
	store.dispatch(loadingUser());

	await axios
		.post(`${api}/auth/register/site`, data)
		.then((res) => {
			setAuthorizationHeader(res.data.token, res.data.user._id);
			store.dispatch(registerSite(res.data));
			store.dispatch(clearErrors());
		})
		.catch((err) => store.dispatch(setErrors(err.response.data)));
};

export const FetchSites = async () => {
	await axios
		.get(`${api}/site`)
		.then((res) => store.dispatch(setSites(res.data)))
		.catch((err) => console.log(err));
};

export const LoadUser = async () => {
	store.dispatch(loadingUser());
	await axios
		.get(`${api}/user/${localStorage.getItem('id')}`)
		.then((res) => store.dispatch(setUser(res.data)))
		.catch((err) => console.log(err));
};

export const LogoutUser = async () => {
	localStorage.removeItem('auth-token');
	localStorage.removeItem('id');
	delete axios.defaults.headers.common['Authorization'];
	store.dispatch(logoutUser());
};

const setAuthorizationHeader = (token, id) => {
	localStorage.setItem('auth-token', token);
	localStorage.setItem('id', id);
	axios.defaults.headers.common['Authorization'] = token;
};
