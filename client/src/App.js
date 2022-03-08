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
    DashboardAdmin,
    DashboardTeacher,
} from 'pages';
import { Nav } from 'components';
import { LoadUser } from 'redux/user';

export const App = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (authenticated) LoadUser();
    }, [authenticated]);

    return (
        <>
            <Nav />
            <Router>
                <Routes>
                    {/* Admin routes */}
                    {authenticated && user.type === 1 && (
                        <>
                            <Route
                                exact
                                path='/dashboard/shifts'
                                element={<DashboardAdmin />}
                            />

                            {/* Redirects */}
                            <Route
                                path='*'
                                element={<Navigate to='/dashboard/shifts' />}
                            />
                        </>
                    )}

                    {/* User routes */}
                    {authenticated && user.type === 2 && (
                        <>
                            <Route
                                exact
                                path='/dashboard/shifts'
                                element={<DashboardTeacher />}
                            />
                            <Route
                                exact
                                path='/profile'
                                element={<Profile />}
                            />

                            {/* Redirects */}
                            <Route
                                path='*'
                                element={<Navigate to='/profile' />}
                            />
                        </>
                    )}

                    {/* Authenticated Global routes */}
                    {authenticated && (
                        <>
                            <Route
                                exact
                                path='/profile'
                                element={<Profile />}
                            />
                        </>
                    )}

                    {/* Unauthenticated routes */}
                    {!authenticated && (
                        <>
                            <Route exact path='/' element={<Home />} />
                            <Route exact path='/login' element={<Login />} />
                            <Route
                                exact
                                path='/register'
                                element={<Register />}
                            />
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
        </>
    );
};
