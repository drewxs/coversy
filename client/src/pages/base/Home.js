import { Button } from '@mui/material';
import HeroImg from 'assets/hero.jpg';

export const Home = () => {
  return (
    <section className='home'>
      <img src={HeroImg} alt='' className='bg-img' />
      <div className='container'>
        <h2>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem eos
          facere, debitis voluptatum illum ipsum enim necessitatibus commodi
          obcaecati sequi.
        </h2>
      </div>
    </section>
  );
};
