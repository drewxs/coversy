import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Profile, Registration, SiteRegistration, Welcome } from 'pages';

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Login />} />
				<Route exact path='/profile' element={<Profile />} />
				<Route exact path='/registration' element={<Registration />} />
				<Route
					exact
					path='/registration/site'
					element={<SiteRegistration />}
				/>
				<Route
					path='/confirm/:confirmationCode'
					element={<Welcome />}
				/>
			</Routes>
		</Router>
	);
};
