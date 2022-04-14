import React from 'react';
import { Button } from '@mui/material';
import HeroImg from 'assets/hero.jpg';

export const Home = () => {
    return (
        <section className='home'>
            <img src={HeroImg} alt='Floating book.' className='bg-img' />
            <div className='container'>
                <Button
                    className='button'
                    variant='contained'
                    color='primary'
                    href='/register/site'
                    size='large'
                >
                    Site Registration
                </Button>
            </div>
        </section>
    );
};
