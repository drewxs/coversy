import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginUser } from 'redux/user';
import { Button, TextField } from '@mui/material';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const errors = useSelector((state) => state.user.errors);
    const success = useSelector((state) => state.user.success);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    return (
        <section className='register'>
            <div className='card'>
                <Button href='/Login'>{`< Back`}</Button>
                <div className='h-cont'>
                    <h1>Forgot Password</h1>
                </div>
                {page === 1 && (
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
                        {errors && <p className='error'>{errors}</p>}
                        <p>
                            New User? <a href='/register'>Register Here</a>
                        </p>
                    </form>
                )}
                {page === 2 && (
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
