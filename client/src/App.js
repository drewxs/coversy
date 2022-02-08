import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from 'pages/Profile';

export const App = () => {
	return (
		<>
			<Route exact path='/profile' component={Profile} />
		</>
	);
};
