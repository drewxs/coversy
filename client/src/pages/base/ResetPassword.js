import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [page, setPage] = useState(1);
    const resetExists = true;
    return (
        <section className='register'>
            <div className='card'>
                <div className='h-cont'>
                    <h1>Reset Password</h1>
                </div>
                {page === 1 && resetExists && (
                    <form>
                        <TextField
                            className='input'
                            variant='outlined'
                            label='New Password'
                            type='newPassword'
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            className='input'
                            variant='outlined'
                            label='Confirm Password'
                            type='confirmPassword'
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            className='submit-btn'
                            variant='contained'
                            color='primary'
                            size='large'
                            onClick={() => {
                                setPage(page + 1);
                            }}
                        >
                            Reset Password
                        </Button>
                    </form>
                )}
                {!resetExists && (
                    <h3>Password reset does not exist or is no longer valid</h3>
                )}
            </div>
        </section>
    );
};