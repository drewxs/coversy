import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, Profile, Register, RegisterSite, Welcome } from 'pages';

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/profile' element={<Profile />} />
				<Route exact path='/register' element={<Register />} />
				<Route exact path='/register/site' element={<RegisterSite />} />
				<Route
					path='/confirm/:confirmationCode'
					element={<Welcome />}
				/>
			</Routes>
		</Router>
	);
};
