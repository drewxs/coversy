import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';

import { Errors } from 'components';
import { LoginUser } from 'redux/data/user';

export const Login = () => {
    const errors = useSelector((state) => state.user.errors);
    const success = useSelector((state) => state.user.success);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await LoginUser({ email, password });
    };

    useEffect(() => {
        if (success) navigate('/');
    }, [success, navigate]);

    return (
        <section className='register'>
            <div className='card'>
                <Button onClick={() => navigate(-1)}>{`< Back`}</Button>
                <div className='h-cont'>
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className='input'
                        variant='outlined'
                        label='Email'
                        type='email'
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className='input'
                        variant='outlined'
                        label='Password'
                        type='password'
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className='submit-btn'
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                    >
                        Login
                    </Button>
                    <Errors errors={errors} />
                    <p>
                        New User? <a href='/register'>Register Here</a>
                    </p>
                    <p>
                        <a href='/forgotpassword'> Forgot Password?</a>
                    </p>
                </form>
            </div>
        </section>
    );
};
