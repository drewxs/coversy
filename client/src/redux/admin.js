import { setUsers, activateUser } from './userSlice';
import axios from 'axios';
import store from './store';

const api = process.env.REACT_APP_API_URL;

export const FetchUsers = async (siteId) => {
	await axios
		.get(`${api}/user/site/${siteId}`, {
			headers: { 'auth-token': localStorage.getItem('auth-token') },
		})
		.then((res) => store.dispatch(setSites(res.data)))
		.catch((err) => console.log(err));
};

export const ToggleUserActivatedById = async (userId, siteId) => {
	await axios
		.put(`${api}/user/${userId}/${siteId}/activate`, {
			headers: { 'auth-token': localStorage.getItem('auth-token') },
		})
		.then((res) => store.dispatch(activateUser(res.data.activated)))
		.catch((err) => console.log(err));
};
