import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, IconButton, Badge } from '@mui/material';
import { LogoutUser } from 'redux/user';
import { NotificationsNone } from '@mui/icons-material';
import { GetNotifications, ReadNotifications } from 'redux/notif';
import logo from 'assets/logo.svg';

export const Nav = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);

    const notifications = useSelector(
        (state) => state.notification.notifications
    );
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        ReadNotifications();
        setOpen(true);
    };
    useEffect(() => {
        if (authenticated) {
            GetNotifications();
        }
    }, [authenticated]);

    const hasUnread = () => {
        let total = 0;
        notifications.forEach((notif) => {
            total += notif.read;
        });
        return total === notifications.length;
    };
    const greetings = ['Hello', 'Hi', 'Welcome'];

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
                            {
                                greetings[
                                    Math.floor(Math.random() * greetings.length)
                                ]
                            }
                            , {user.firstName} {user.lastName}
                        </p>
                    )}
                </div>
                <div className='nav-links'>
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
                            <div>
                                <Badge
                                    variant='dot'
                                    color='primary'
                                    overlap='circular'
                                    invisible={hasUnread()}
                                >
                                    <IconButton
                                        color='primary'
                                        className='button notif-btn'
                                        onClick={() => {
                                            handleOpen();
                                        }}
                                    >
                                        <NotificationsNone />
                                    </IconButton>
                                </Badge>
                                {open && (
                                    <div className='notif-dropdown card'>
                                        {notifications.map((notif, k) => (
                                            <div className='notif-item' key={k}>
                                                <h4>{notif.title}</h4>
                                                <p>{notif.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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
