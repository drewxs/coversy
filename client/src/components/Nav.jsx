import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, IconButton, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { NavLink, Notifications } from 'components';
import logo from 'assets/logo.svg';
import breakpoints from 'scss/abstract/_breakpoints.scss';
import { LogoutUser } from 'redux/data/user';

export const Nav = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const user = useSelector((state) => state.user.user);
  const [openNav, setOpenNav] = useState(false);
  const tablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

  return (
    <section className='nav'>
      <div className='container'>
        <div className='logo-cont'>
          <a href='/'>
            <img className='logo' src={logo} alt='Coversy logo'></img>
          </a>
          {authenticated && (
            <p className='hello'>
              Hi, {user.firstName} {user.lastName}
            </p>
          )}
        </div>
        {tablet && authenticated && <Notifications />}
        <IconButton
          className='hamburger-icon'
          onClick={() => setOpenNav(!openNav)}
        >
          <Menu fontSize='large' color='white'></Menu>
        </IconButton>
        <div className={`nav-links ${openNav ? '' : 'closed'}`}>
          {/* Unauthenticated links */}
          {!authenticated && (
            <>
              <NavLink text='User Registration' link='/register' />
              <NavLink text='Site Registration' link='/register/site' />
              <NavLink text='Login' link='login' />
            </>
          )}

          {/* Admin links */}
          {authenticated && user.type === 1 && (
            <>
              <NavLink text='Shifts' link='/dashboard/shifts' />
              <NavLink text='Payroll' link='/dashboard/payroll' />
              <NavLink text='Users' link='/dashboard/users' />
              <NavLink text='Tickets' link='/dashboard/tickets' />
              <NavLink text='Profile' link='/profile' />
            </>
          )}

          {/* User links */}
          {authenticated && user.type === 2 && (
            <>
              <NavLink text='Shifts' link='/shifts' />
              <NavLink text='Payroll' link='/payroll' />
              <NavLink text='Profile' link='/profile' />
            </>
          )}

          {/* Authenticated links */}
          {authenticated && (
            <>
              {!tablet && <Notifications />}
              <Button
                color='primary'
                className='button logout-btn'
                onClick={() => {
                  <Navigate to='/login' />;
                  LogoutUser();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
