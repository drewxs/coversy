import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { RegisterSite } from 'redux/user';

export const SiteRegister = () => {
	const [name, setName] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [zip, setZip] = useState('');
	const [province, setProvince] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(false);

	const errors = useSelector((state) => state.userSlice.errors);

	const handleSubmit = (e) => {
		RegisterSite({
			name,
			address: {
				street,
				city,
				zip,
				province,
			},
			email,
			password,
		});
		if (!errors) setSuccess(true);
	};

	const provinces = [
		{ code: 'AB', name: 'Alberta' },
		{ code: 'BC', name: 'British Columbia' },
		{ code: 'MB', name: 'Manitoba' },
		{ code: 'NB', name: 'New Brunswick' },
		{ code: 'NL', name: 'Newfoundland and Labrador' },
		{ code: 'NS', name: 'Nova Scotia' },
		{ code: 'NT', name: 'Northwest Territories' },
		{ code: 'NU', name: 'Nunavut' },
		{ code: 'ON', name: 'Ontario' },
		{ code: 'PE', name: 'Prince Edward Island' },
		{ code: 'QC', name: 'Quebec' },
		{ code: 'SK', name: 'Saskatchewan' },
		{ code: 'YT', name: 'Yukon' },
	];

	return (
		<section className='register'>
			<div className='card'>
				<Button href='/'>{`< Back`}</Button>
				<div className='h-cont'>
					<h1>Registration</h1>
				</div>
				{!success || errors ? (
					<form>
						<TextField
							className='input'
							variant='outlined'
							label='Site Name'
							fullWidth
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							className='input'
							variant='outlined'
							label='Street Address'
							fullWidth
							value={street}
							onChange={(e) => setStreet(e.target.value)}
						/>
						<TextField
							className='input'
							variant='outlined'
							label='City'
							fullWidth
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<TextField
							className='input'
							variant='outlined'
							label='Zip'
							fullWidth
							value={zip}
							onChange={(e) => setZip(e.target.value)}
						/>
						<FormControl fullWidth>
							<InputLabel>Province</InputLabel>
							<Select
								className='input'
								value={province}
								label='Province'
								onChange={(e) => setProvince(e.target.value)}
							>
								{provinces.map((province) => (
									<MenuItem value={province.code}>
										{province.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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
							onClick={handleSubmit}
						>
							Register
						</Button>
						{errors && <p className='error'>{errors}</p>}
						<p>
							Already registered?{' '}
							<a href='/login'> Sign in here</a>
						</p>
					</form>
				) : (
					<>
						<p>
							Thank you for signing up. Please check your email
							for a verification link. If you do not see a
							confirmation email, please check your junk mail
							folder.
						</p>
						<br />
						<p>
							Verified? <a href='/login'> Sign in here</a>
						</p>
					</>
				)}
			</div>
		</section>
	);
};
