import React from 'react';
import Home from './Pages/Home'
import Navbar from './Components/Home/Navbar';
import About from './Pages/About';
import Footer from './Components/Home/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './Components/Auth/AuthPage';
import Dashboard from './Dashboard/Doctors/Doctors';
import Videocall from './Components/DashBoard/Doctors/Videocall';
import Services from "./Pages/Services";
import SingleService from "./Pages/SingleService";
import Doctors from "./Pages/Doctors";
import Contact from "./Pages/Contact";
import News from "./Pages/News";
import NewsDetails from "./Pages/NewsDetails";
import Appointment from "./Pages/Appointment";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctor" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/video-call/:id" element={<Videocall />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/free-checkup" element={<SingleService />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/news-details" element={<NewsDetails />} />
                <Route path="/appointment" element={<Appointment/>}/>

            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
