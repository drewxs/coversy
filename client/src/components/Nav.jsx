import React from 'react';
import { useSelector } from 'react-redux';

export const Nav = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <a className='navbar-brand' href='/'>
                    <img
                        src='/images/logo.png'
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt=''
                    />
                    <span className='ml-2'>Coversy</span>
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'
                >
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <a className='nav-link' href='/'>
                                Home
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/login'>
                                Login
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/register'>
                                Register
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
