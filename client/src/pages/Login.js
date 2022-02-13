import React from 'react';

export const Login = () => {
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
							></input>
						</div>
						<div className='usrpass'>
							<input
								type='password'
								placeholder='Password'
								className='name'
							></input>
						</div>
						<div className='forgotPass'>
							<a href='#'>Forgot password?</a>
						</div>
						<div className='loginButton'>
							<button>
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
