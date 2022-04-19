import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';

import logo from 'assets/logo.svg';
import breakpoints from 'scss/abstract/_breakpoints.scss';
import { LogoutUser } from 'redux/user';
import { Notifications } from 'components/Notifications';

export const Nav = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);
    const [openNav, setOpenNav] = useState(false);
    const tablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

    return (
        <section className='nav'>
            <div className='container'>
                <div className='logo-cont'>
                    <a href='/'>
                        <img
                            className='logo'
                            src={logo}
                            alt='Coversy logo'
                        ></img>
                    </a>
                    {authenticated && (
                        <p className='hello'>
                            Hi, {user.firstName} {user.lastName}
                        </p>
                    )}
                </div>
                {tablet && <Notifications />}
                <IconButton
                    className='hamburger-icon'
                    onClick={() => setOpenNav(!openNav)}
                >
                    <Menu fontSize='large' color='white'></Menu>
                </IconButton>
                <div className={`nav-links ${openNav ? '' : 'closed'}`}>
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
                                User Registration
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
                                href='/payroll'
                                className={`button ${
                                    window.location.pathname === '/payroll'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Payroll
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
                        </>
                    )}

                    {/* Authenticated links */}
                    {authenticated && (
                        <>
                            {!tablet && <Notifications />}
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
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
