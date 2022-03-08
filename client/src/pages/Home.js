import React from 'react';
import { Button } from '@mui/material';
import HeroImg from 'assets/hero.jpg';

export const Home = () => {
    return (
        <div className='home'>
            <section className='hero'>
                <div className='container'>
                    <div className='col left'>
                        <h3>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Est quos obcaecati unde officia voluptatem eos
                            nesciunt voluptatum libero laboriosam numquam?
                        </h3>
                        <Button
                            className='button'
                            variant='contained'
                            color='primary'
                            href='/register/site'
                            size='large'
                        >
                            Register New Site
                        </Button>
                    </div>
                    <div className='col'>
                        <img src={HeroImg} alt='Woman looking at clock.' />
                    </div>
                </div>
            </section>
        </div>
    );
};
