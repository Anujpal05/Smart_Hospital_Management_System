import React from 'react';
import Navbar from '../Components/Home/Navbar';
import HeroSection from '../Components/Home/HeroSection';
import Welcome from '../Components/Home/Welcome';
import Service from '../Components/Home/Service';
import HomeSection from '../Components/Home/HomeSection';
import Footer from '../Components/Home/Footer';

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <HeroSection/>
      <div className=" w-[80%]]">
        <Welcome/>
      <Service/>
      <HomeSection/>
      <Footer/>
      
      </div>
    </div>
  );
};

export default Home;
