import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginUser } from 'redux/user';
import { Button, TextField } from '@mui/material';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const errors = useSelector((state) => state.userSlice.errors);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		LoginUser({ email, password });
		if (!errors) navigate('/profile');
	};

	return (
		<section className='register'>
			<div className='card'>
				<Button href='/'>{`< Back`}</Button>
				<div className='h-cont'>
					<h1>Login</h1>
				</div>
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
						onClick={handleSubmit}
					>
						Login
					</Button>
					{errors && <p className='error'>{errors}</p>}
					<p>
						New User? <a href='/register'>Register Here</a>
					</p>
				</form>
			</div>
		</section>
	);
};
