import React from 'react';
import HeroSection from '../Components/Home/HeroSection';
import Welcome from '../Components/Home/Welcome';
import Service from '../Components/Home/Service';
import Specialty_Section from '../Components/Home/Specialty_Section';
import Appointment_Section from '../Components/Home/Appointment_Section';
import Doctors_Section from '../Components/Home/Doctors_Section';
import News_Section from '../Components/Home/News_Section';
import Contact_Section from '../Components/Home/Contact_Section';
import AuthPage from '../Components/Auth/AuthPage';

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <HeroSection />
      <div className=" w-[80%]]">
        <Welcome />
        <Service />
        <Specialty_Section />
        <Appointment_Section />
        <Doctors_Section />
        <News_Section />
        <Contact_Section />

      </div>
    </div>
  );
};

export default Home;
