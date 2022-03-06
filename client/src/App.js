import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Home,
    Login,
    Profile,
    Register,
    SiteRegister,
    Welcome,
    PayrollAdmin,
    DashboardAdmin,
} from "pages";
import { LoadUser } from "redux/user";

export const App = () => {
    const authenticated = useSelector((state) => state.userSlice.authenticated);

    useEffect(() => {
        if (authenticated) LoadUser();
    }, [authenticated]);

    return (
        <Router>
            <Routes>
                {authenticated && (
                    <>
                        <Route
                            exact
                            path="/"
                            element={<Navigate to="/profile" />}
                        />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route
                            exact
                            path="/login"
                            element={<Navigate to="/profile" />}
                        />
                        <Route
                            exact
                            path="/register"
                            element={<Navigate to="/profile" />}
                        />
                        <Route
                            exact
                            path="/register/site"
                            element={<Navigate to="/profile" />}
                        />
                        <Route
                            exact
                            path="/PayrollAdmin"
                            element={<Navigate to="/PayrollAdmin" />}
                        />
                        <Route
                            exact
                            path="/DashboardAdmin"
                            element={<Navigate to="/DashboardAdmin" />}
                        />
                        
                    </>
                )}
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/register/site" element={<SiteRegister />} />
                <Route
                    path="/confirm/:confirmationCode"
                    element={<Welcome />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};
