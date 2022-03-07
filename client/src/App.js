import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Home,
    Login,
    Profile,
    Register,
    SiteRegister,
    Welcome,
    PayrollAdmin,
    DashboardAdmin,
} from 'pages';
import { LoadUser } from 'redux/user';

export const App = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (authenticated) LoadUser();
    }, [authenticated]);

    return (
        <Router>
            <Routes>
                {/* Admin routes */}
                {authenticated && user.type === 1 && (
                    <>
                        <Route
                            exact
                            path='/payroll'
                            element={<PayrollAdmin />}
                        />
                        <Route
                            exact
                            path='/home'
                            element={<DashboardAdmin />}
                        />

                        {/* Redirects */}
                        <Route path='*' element={<Navigate to='/home' />} />
                    </>
                )}

                {/* User routes */}
                {authenticated && user.type === 2 && (
                    <>
                        <Route exact path='/profile' element={<Profile />} />

                        {/* Redirects */}
                        <Route path='*' element={<Navigate to='/profile' />} />
                    </>
                )}

                {/* Global routes */}
                {!authenticated && (
                    <>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/register' element={<Register />} />
                        <Route
                            exact
                            path='/register/site'
                            element={<SiteRegister />}
                        />
                        <Route
                            path='/confirm/:confirmationCode'
                            element={<Welcome />}
                        />

                        {/* Redirects */}
                        <Route path='*' element={<Navigate to='/' />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};
