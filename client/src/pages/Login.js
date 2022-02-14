import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginUser } from 'redux/user';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const loading = useSelector((state) => state.userSlice.loading);
	const errors = useSelector((state) => state.userSlice.errors);
	let navigate = useNavigate();

	const handleSubmit = async () => {
		LoginUser({ email, password });

		if (!errors) navigate('/profile');
	};

	return (
		<div className='main'>
			<div className='sub-main'>
				<div>
					<div className='imgs'>
						<div className='container-imgs'>
							<img></img>
						</div>
					</div>
					<div>
						<div className='usrpass'>
							<input
								type='text'
								placeholder='Email'
								className='name'
								onChange={(e) => setEmail(e.target.value)}
							></input>
						</div>
						<div className='usrpass'>
							<input
								type='password'
								placeholder='Password'
								className='name'
								onChange={(e) => setPassword(e.target.value)}
							></input>
						</div>
						<p>{errors}</p>
						<div className='forgotPass'>
							<a href='#'>Forgot password?</a>
						</div>
						<div className='loginButton'>
							<button onClick={() => handleSubmit()}>
								<p>Login</p>
							</button>
							<div className='newUser'>
								<p>
									<a href='#'>New User?</a> Register Here
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
