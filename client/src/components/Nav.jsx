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
                                color='secondary'
                                href='/register'
                                className='button'
                            >
                                Register
                            </Button>

                            <Button
                                variant='outlined'
                                color='secondary'
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
                                color='secondary'
                                href='/home'
                                className='button'
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant='outlined'
                                className='button logout-btn'
                                href='/payroll'
                            >
                                Payroll
                            </Button>
                        </>
                    )}

                    <Button
                        variant='outlined'
                        className='button logout-btn'
                        onClick={() => {
                            <Navigate to='/login' />;
                            LogoutUser();
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </section>
    );
};
