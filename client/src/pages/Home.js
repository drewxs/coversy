import React from 'react';
import { Button } from '@mui/material';

export const Home = () => {
	return (
		<div className='home'>
			<section className='nav'>
				<div className='container'>
					<h6>Coversy</h6>
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
