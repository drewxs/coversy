import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
	Login,
	Profile,
	Registration,
	SiteRegistration,
	Stylesheet,
} from 'pages';

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/profile' element={<Profile />} />
				<Route exact path='/registration' element={<Registration />} />
				<Route
					exact
					path='/registration/site'
					element={<SiteRegistration />}
				/>
				<Route exact path='/stylesheet' element={<Stylesheet />} />
			</Routes>
		</Router>
	);
};
