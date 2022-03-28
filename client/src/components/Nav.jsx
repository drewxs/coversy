import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { LogoutUser } from 'redux/user';
import logo from 'assets/logo.svg';

export const Nav = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);

    return (
        <section className='nav'>
            <div className='container'>
                <img className='logo' src={logo} alt='Coversy logo'></img>
                <div>
                    {/* Unauthenticated links */}
                    {!authenticated && (
                        <>
                            <Button
                                href='/register'
                                className={`button ${
                                    window.location.pathname === '/register'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Register
                            </Button>
                            <Button
                                href='/login'
                                className={`button ${
                                    window.location.pathname === '/login'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Login
                            </Button>
                        </>
                    )}

                    {/* Admin links */}
                    {authenticated && user.type === 1 && (
                        <>
                            <Button
                                href='/dashboard/shifts'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/shifts'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Shifts
                            </Button>
                            <Button
                                href='/dashboard/payroll'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/payroll'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Payroll
                            </Button>
                            <Button
                                href='/dashboard/users'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/users'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Users
                            </Button>
                            <Button
                                href='/dashboard/tickets'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/tickets'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Tickets
                            </Button>
                            <Button
                                href='/profile'
                                className={`button ${
                                    window.location.pathname === '/profile'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Profile
                            </Button>
                            {/* <Button
                                
                                className='button logout'
                                href='/payroll'
                            >
                                Payroll
                            </Button> */}
                        </>
                    )}

                    {/* User links */}
                    {authenticated && user.type === 2 && (
                        <>
                            <Button
                                href='/shifts'
                                className={`button ${
                                    window.location.pathname === '/shifts'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Shifts
                            </Button>
                            <Button
                                href='/profile'
                                className={`button ${
                                    window.location.pathname === '/profile'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Profile
                            </Button>
                            <Button
                                href='/payroll'
                                className={`button ${
                                    window.location.pathname === '/payroll'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Payroll
                            </Button>
                        </>
                    )}

                    {/* Authenticated links */}
                    {authenticated && (
                        <Button
                            color='primary'
                            className='button logout-btn'
                            onClick={() => {
                                <Navigate to='/login' />;
                                LogoutUser();
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};
