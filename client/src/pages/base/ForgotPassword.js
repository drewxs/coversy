import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const errors = useSelector((state) => state.user.errors);
    const [page, setPage] = useState(1);
    const resetExists = true;

    return (
        <section className='register'>
            <div className='card'>
                <Button href='/Login'>{`< Back`}</Button>
                <div className='h-cont'>
                    <h1>Forgot Password</h1>
                </div>
                {page === 1 && resetExists && (
                    <form>
                        <TextField
                            className='input'
                            variant='outlined'
                            label='Email'
                            type='email'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            Submit
                        </Button>
                    </form>
                )}
                {page === 2 && resetExists && (
                    <h3>
                        Please check your email for a link to reset your
                        password. If you do not see an email, please check your
                        junk mail folder.
                    </h3>
                )}
                {!resetExists && (
                    <form>
                        <h3>
                            Password reset does not exist or is no longer valid
                        </h3>
                        {errors && <p className='error'>{errors}</p>}
                        <p>
                            New User? <a href='/register'>Register Here</a>
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
};
