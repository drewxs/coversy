import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, TextField } from '@mui/material';

import { Errors } from 'components';
import { RequestPasswordReset } from 'redux/data/password';

export const ForgotPassword = () => {
  const loading = useSelector((state) => state.password.loading);
  const success = useSelector((state) => state.password.success);
  const errors = useSelector((state) => state.password.errors);

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    RequestPasswordReset({ email });
  };

  return (
    <section className='register'>
      <div className='card'>
        <Button href='/Login'>{`< Back`}</Button>
        <div className='h-cont'>
          <h1>Forgot Password</h1>
        </div>

        {!success ? (
          !loading ? (
            <>
              <p>
                Enter the email associated with your account and you will be
                sent a link to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <TextField
                  sx={{ mt: '1rem' }}
                  className='input'
                  variant='outlined'
                  label='Email'
                  type='email'
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Errors errors={errors} />
                <Button
                  className='submit-btn'
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                >
                  Submit
                </Button>
              </form>
            </>
          ) : (
            <CircularProgress />
          )
        ) : (
          <p>
            Please check your email for a link to reset your password. If you do
            not see an email, please check your junk mail folder.
          </p>
        )}
      </div>
    </section>
  );
};
