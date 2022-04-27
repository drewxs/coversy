import React from 'react';
import { Button } from '@mui/material';

export const NavLink = ({ text, link }) => {
  return (
    <Button
      href={`${link}`}
      className={`button ${
        window.location.pathname === `${link}` ? 'active' : ''
      }`}
    >
      {text}
    </Button>
  );
};
