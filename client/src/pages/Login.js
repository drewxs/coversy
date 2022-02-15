import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginUser } from 'redux/user';
import { Button, TextField } from '@mui/material';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const errors = useSelector((state) => state.userSlice.errors);
	let navigate = useNavigate();

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
				<form action=''>
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
					<p>{errors}</p>
					<p>
						<a href='/registration'>New User?</a> Register Here
					</p>
				</form>
			</div>
		</section>
	);
};
