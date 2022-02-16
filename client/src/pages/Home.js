import React from 'react';
import { Button } from '@mui/material';

export const Home = () => {
	return (
		<div className='home'>
			<section className='nav'>
				<div className='container'>
					<h2>Coversy</h2>
					<div className='button-cont'>
						<Button
							variant='contained'
							color='primary'
							href='/register'
							className='button'
						>
							Register
						</Button>
						<Button
							variant='contained'
							color='primary'
							href='/register/site'
							className='button'
						>
							Register Site
						</Button>
						<Button
							variant='contained'
							color='primary'
							href='/login'
							className='button'
						>
							Login
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};
