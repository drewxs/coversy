import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@mui/material';
import { FindUserByPasswordResetCode, PasswordReset } from 'redux/password';

export const ResetPassword = () => {
    const loading = useSelector((state) => state.password.loading);
    const success = useSelector((state) => state.password.success);
    const errors = useSelector((state) => state.password.errors);
    const reset = useSelector((state) => state.password.reset);

    const [searchParams] = useSearchParams();

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        PasswordReset(
            searchParams.get('code'),
            newPassword,
            confirmNewPassword
        );
    };

    useEffect(() => {
        FindUserByPasswordResetCode(searchParams.get('code'));
    }, [searchParams]);

    return (
        <section className='register'>
            <div className='card'>
                <div className='h-cont'>
                    <h1>Reset Password</h1>
                </div>
                {/* Reset exists */}
                {reset ? (
                    // Success states
                    !success ? (
                        // Loading states
                        !loading ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    className='input'
                                    variant='outlined'
                                    label='New Password'
                                    type='password'
                                    fullWidth
                                    value={newPassword}
                                    autoComplete='newoff'
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                                <TextField
                                    className='input'
                                    variant='outlined'
                                    label='Confirm Password'
                                    type='password'
                                    fullWidth
                                    value={confirmNewPassword}
                                    autoComplete='new-password'
                                    onChange={(e) =>
                                        setConfirmNewPassword(e.target.value)
                                    }
                                />
                                {errors && <p className='error'>{errors}</p>}
                                <Button
                                    className='submit-btn'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    type='submit'
                                >
                                    Reset Password
                                </Button>
                            </form>
                        ) : (
                            <CircularProgress />
                        )
                    ) : (
                        <>
                            <p>Password Successfully reset.</p>
                            <br />
                            <Link to={'/login'}>Please Login</Link>
                        </>
                    )
                ) : (
                    <p>Password reset does not exist or is no longer valid</p>
                )}
            </div>
        </section>
    );
};
