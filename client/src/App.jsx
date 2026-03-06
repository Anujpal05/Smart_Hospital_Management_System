import React from 'react';
import Home from './Pages/Home'
import Navbar from './Components/Home/Navbar';
import About from './Pages/About';
import Footer from './Components/Home/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './Components/Auth/AuthPage';
import Dashboard from './Dashboard/Doctors/Doctors';
import Videocall from './Components/DashBoard/Doctors/Videocall';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctor" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/video-call/:id" element={<Videocall />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;