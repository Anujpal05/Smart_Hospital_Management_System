import React from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Home/Navbar";
import About from "./Pages/About";
import Footer from "./Components/Home/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Services from "./Pages/Services";
import SingleService from "./Pages/SingleService";
import Doctors from "./Pages/Doctors";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/free-checkup" element={<SingleService />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
