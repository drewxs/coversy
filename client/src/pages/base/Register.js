import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { FetchSites, RegisterUser } from 'redux/user';
import { Errors } from 'components';

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [site, setSite] = useState('');

    const sites = useSelector((state) => state.user.sites);
    const errors = useSelector((state) => state.user.errors);
    const success = useSelector((state) => state.user.success);

    const handleSubmit = (e) => {
        e.preventDefault();

        RegisterUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            site: site,
        });
    };

    useEffect(() => {
        FetchSites();
    }, []);

    return (
        <section className='register'>
            <div className='card'>
                <Button href='/'>{`< Back`}</Button>
                <div className='h-cont'>
                    <h1>User Registration</h1>
                </div>
                {!success ? (
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <InputLabel>Site</InputLabel>
                            <Select
                                label='Site'
                                className='input'
                                value={site}
                                onChange={(e) => setSite(e.target.value)}
                            >
                                {sites?.map((site, k) => (
                                    <MenuItem value={site._id} key={k}>
                                        {site.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            className='input'
                            variant='outlined'
                            label='First Name'
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            className='input'
                            variant='outlined'
                            label='Last Name'
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
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
                            autoComplete='new-password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            className='submit-btn'
                            variant='contained'
                            color='primary'
                            size='large'
                            type='submit'
                        >
                            Register
                        </Button>
                        <Errors errors={errors} />
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
