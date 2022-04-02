import React from 'react';
import { Link } from 'react-router-dom';
import { confirmUser } from 'services/auth.service';

export const Welcome = (props) => {
    if (props.match.path === '/confirm/:confirmationCode') {
        confirmUser(props.match.params.confirmationCode);
    }

    return (
        <div className='container'>
            <h1>Account confirmed!</h1>
            <Link to={'/login'}>Please Login</Link>
        </div>
    );
};
