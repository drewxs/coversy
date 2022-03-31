import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginUser } from 'redux/user';
import { Button, TextField } from '@mui/material';

const ConfirmPassword = () => {
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const errors = useSelector((state) => state.user.errors);
    const success = useSelector((state) => state.user.success);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        await LoginUser({ newPassword, confirmPassword });
    };
    return (
        <section className='register'>
            <div className='card'>
                <Button href='/Login'>{`< Back`}</Button>
                <div className='h-cont'>
                    <h1>Forgot Password</h1>
                </div>
                <form>
                    <TextField
                        className='input'
                        variant='outlined'
                        label='newPassword'
                        type='newPassword'
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                    />
                    <Button
                        className='submit-btn'
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    {errors && <p className='error'>{errors}</p>}
                    <p>
                        New User? <a href='/register'>Register Here</a>
                    </p>
                </form>
                {errors && <p className='error'>{errors}</p>}
                <p>
                    New User? <a href='/register'>Register Here</a>
                </p>
            </div>
        </section>
    );
};

export default ConfirmPassword;
