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
  Register,
  SiteRegister,
  Welcome,
  Profile,
  AdminPayroll,
  AdminShifts,
  AdminTickets,
  AdminUsers,
  Payroll,
  Shifts,
  PayrollReport,
  CombinedPayrollReport,
  ForgotPassword,
  ResetPassword,
} from 'pages';
import { Nav, UnactivatedModal } from 'components';
import { LoadUser } from 'redux/data/user';

export const App = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (authenticated) LoadUser();
  }, [authenticated]);

  return (
    <>
      <Nav />
      <UnactivatedModal />
      <Router>
        <Routes>
          {/* Authenticated routes */}
          {authenticated && (
            <>
              <Route path='/profile' element={<Profile />} />
            </>
          )}

          {/* Admin routes */}
          {authenticated && user.type === 1 && (
            <>
              <Route path='/dashboard/payroll' element={<AdminPayroll />} />
              <Route path='/dashboard/shifts' element={<AdminShifts />} />
              <Route path='/dashboard/tickets' element={<AdminTickets />} />
              <Route path='/dashboard/users' element={<AdminUsers />} />
              <Route
                path='/payroll/report/:date'
                element={<CombinedPayrollReport />}
              />

              {/* Redirects */}
              <Route path='*' element={<Navigate to='/dashboard/shifts' />} />
            </>
          )}

          {/* User routes */}
          {authenticated && user.type === 2 && (
            <>
              <Route path='/shifts' element={<Shifts />} />
              <Route path='/payroll' element={<Payroll />} />
              <Route path='/payroll/report/:date' element={<PayrollReport />} />

              {/* Redirects */}
              <Route path='*' element={<Navigate to='/shifts' />} />
            </>
          )}

          {/* Unauthenticated routes */}
          {!authenticated && (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path='/resetpassword/' element={<ResetPassword />} />
              <Route path='/register/site' element={<SiteRegister />} />
              <Route path='/confirm' element={<Welcome />} />

              {/* Redirects */}
              <Route path='*' element={<Navigate to='/' />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};
