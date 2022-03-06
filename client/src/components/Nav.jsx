import React from 'react';
import { useSelector } from 'react-redux';

export const Nav = () => {
	const authenticated = useSelector((state) => state.user.authenticated);
	const user = useSelector((state) => state.user.user);

	return <div></div>;
};
