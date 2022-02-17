import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, Login, Profile, Register, SiteRegister, Welcome } from 'pages';
import { LoadUser } from 'redux/user';

export const App = () => {
	const authenticated = useSelector((state) => state.userSlice.authenticated);

	useEffect(() => {
		if (authenticated) LoadUser();
	}, [authenticated]);

	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				{authenticated && (
					<>
						<Route exact path='/profile' element={<Profile />} />
						<Route
							exact
							path='/login'
							element={<Navigate to='/profile' />}
						/>
						<Route
							exact
							path='/register'
							element={<Navigate to='/profile' />}
						/>
						<Route
							exact
							path='/register/site'
							element={<Navigate to='/profile' />}
						/>
					</>
				)}
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/register' element={<Register />} />
				<Route exact path='/register/site' element={<SiteRegister />} />
				<Route
					path='/confirm/:confirmationCode'
					element={<Welcome />}
				/>
				<Route path='*' element={<Navigate to='/login' />} />
			</Routes>
		</Router>
	);
};
