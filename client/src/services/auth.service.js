import axios from 'axios';

export const verifyUser = (code) => {
	return axios
		.get(`${process.env.REACT_APP_API_URL}/auth/confirm/${code}`)
		.then((res) => {
			return res.data;
		});
};
