import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";

import News_Section from "../Components/Home/News_Section";

const Contact = () => {
  return (
    <div className="w-full">

      {/* ===== Hero Section ===== */}
      <div className="relative w-full h-[250px]">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772545193/photo-1587351021759-3e566b6af7cc_mjko6l.jpg"
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 text-[#1F2B6C]  bg-gray-300/60 flex flex-col justify-center lg:px-20 px-6">
          <p className=" text-sm">Home / Contact</p>
          <h1 className=" text-4xl font-bold mt-2">
            Our Contacts
          </h1>
        </div>
      </div>

     {/* ===== Map Section ===== */}
      <div className="w-full p-5 lg:p-20 lg:px-32">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.939889846573!2d-73.9856646845937!3d40.74881707932769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b3c5b5%3A0x7b2e5c2a8f9a6e7b!2sNew%20York!5e0!3m2!1sen!2sin!4v1616161616161"
          className="w-full h-[400px] border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* ===== Contact Section ===== */}
      <div className=" lg:py-16 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 px-2">

          {/* ===== Contact Form ===== */}
          <div className="">
            <p className="text-[#159EEC] font-semibold text-sm text-center lg:text-left">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl text-[#1F2B6C] font-bold text-blue-900 mt-2 mb-6 text-center lg:text-left">
              Contact
            </h2>

            <form className="bg-[#1F2B6C] p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 rounded-lg">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-3 rounded bg-[#1F2B6C] text-white border-1 border-gray-300 placeholder-gray-300 outline-none "
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded bg-[#1F2B6C] text-white border-1 border-gray-300 placeholder-gray-300 outline-none"
                />
              </div>
              <hr className=" text-gray-300"/>

              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 rounded bg-[#1F2B6C] border-1 border-gray-300 text-white placeholder-gray-300 outline-none"
              />

              <hr className=" text-gray-300"/>

              <textarea
                rows="5"
                placeholder="Message"
                className="w-full p-3 rounded bg-[#1F2B6C] border-1 border-gray-300 text-white placeholder-gray-300 outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#BFD2F8] text-[#1F2B6C] py-3 rounded font-semibold transition cursor-pointer hover:bg-[#A0C4F8] mt-4"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* ===== Contact Info Cards ===== */}
          <div className="space-y-6 grid grid-cols-2 gap-4">

            {/* Emergency */}
            <div className=" flex flex-col justify-center items-center bg-blue-200 hover:bg-[#1F2B6C] hover:text-gray-200 cursor-pointer group text-gray-700 transition duration-300 h-48 lg:p-6 text-sm rounded-lg shadow-md">
              <FaPhoneAlt className="text-blue-900 group-hover:text-gray-200 text-xl lg:text-2xl mb-3" />
              <h3 className="font-bold text-blue-900 group-hover:text-gray-200 mb-2">EMERGENCY</h3>
              <p >(237) 681-812-255</p>
              <p >(237) 666-331-894</p>
            </div>

            {/* Location */}
            <div className="flex flex-col justify-center items-center bg-blue-200 hover:bg-[#1F2B6C] hover:text-gray-200 cursor-pointer group text-gray-700 transition duration-300 h-48 text-sm lg:p-6 rounded-lg shadow-md">
              <FaMapMarkerAlt className="text-blue-900 group-hover:text-gray-200 text-2xl mb-3" />
              <h3 className="font-bold text-blue-900 group-hover:text-gray-200 mb-2">LOCATION</h3>
              <p >0123 Some place</p>
              <p >9876 Some country</p>
            </div>

            {/* Email */}
            <div className=" flex flex-col justify-center items-center bg-blue-200 hover:bg-[#1F2B6C] hover:text-gray-200 cursor-pointer group text-gray-700 transition duration-300 h-48 text-sm lg:p-6 rounded-lg shadow-md">
              <FaEnvelope className="text-blue-900 group-hover:text-gray-200 text-2xl mb-3" />
              <h3 className="font-bold text-blue-900 group-hover:text-gray-200 mb-2">EMAIL</h3>
              <p >hospitalinfo@gmail.com</p>
              <p >support@hospital.com</p>
            </div>

            {/* Working Hours */}
            <div className="flex flex-col justify-center items-center text-sm bg-blue-200 hover:bg-[#1F2B6C] hover:text-gray-200 cursor-pointer group text-gray-700 transition duration-300 h-48 lg:p-6 rounded-lg shadow-md">
              <FaClock className="text-blue-900 group-hover:text-gray-200 text-2xl mb-3" />
              <h3 className="font-bold text-blue-900 group-hover:text-gray-200 mb-2 text-center">WORKING HOURS</h3>
              <p>Mon–Sat 09:00–20:00</p>
              <p >Sunday Emergency only</p>
            </div>

          </div>

        </div>
      </div>

        <News_Section/>
    </div>
  );
};

export default Contact;