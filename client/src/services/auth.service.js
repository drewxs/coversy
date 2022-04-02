import axios from 'axios';

export const confirmUser = (code) => {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/auth/confirm/${code}`)
        .then((res) => {
            return res.data;
        });
};
