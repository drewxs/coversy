import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { LogoutUser } from 'redux/user';

export const Nav = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);

    return (
        <section className='nav'>
            <div className='container'>
                <h2>Coversy</h2>
                <div className='button-cont'>
                    {!authenticated && (
                        <>
                            <Button
                                variant='outlined'
                                color={
                                    window.location.pathname !== '/register'
                                        ? 'primary'
                                        : 'secondary'
                                }
                                href='/register'
                                className='button'
                            >
                                Register
                            </Button>
                            <Button
                                variant='outlined'
                                color={
                                    window.location.pathname !== '/login'
                                        ? 'primary'
                                        : 'secondary'
                                }
                                href='/login'
                                className='button'
                            >
                                Login
                            </Button>
                        </>
                    )}

                    {authenticated && user.type === 1 && (
                        <>
                            <Button
                                variant='outlined'
                                color={
                                    window.location.pathname !==
                                    '/dashboard/shifts'
                                        ? 'primary'
                                        : 'secondary'
                                }
                                href='/dashboard/shifts'
                                className='button'
                            >
                                Shifts
                            </Button>
                            <Button
                                variant='outlined'
                                color={
                                    window.location.pathname !== '/profile'
                                        ? 'primary'
                                        : 'secondary'
                                }
                                href='/profile'
                                className='button'
                            >
                                Profile
                            </Button>
                            {/* <Button
                                variant='outlined'
                                className='button logout'
                                href='/payroll'
                            >
                                Payroll
                            </Button> */}
                        </>
                    )}
                    {authenticated && user.type === 2 && (
                        <>
                            {/* <Button
                                variant='outlined'
                                className='button logout'
                                href='/payroll'
                            >
                                Payroll
                            </Button> */}

                            <Button
                                variant='outlined'
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
