import React from "react";
import { FaHeartbeat, FaVial, FaTint, FaBone, FaStethoscope } from "react-icons/fa";
import Doctors_Section from "../Components/Home/Doctors_Section";
import Contact_Section from "../Components/Home/Contact_Section";

const SingleService = () => {
  return (
    <div className="w-full">

      {/* ===== Hero Section ===== */}
      <div className="relative w-full h-[250px]">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
          alt="Service Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute text-[#1F2B6C] inset-0 bg-gray-200/60 flex flex-col justify-center px-6 lg:px-20">
          <p className="text-sm">Home / Services</p>
          <h1 className="text-4xl font-bold mt-2">
            Free Checkup
          </h1>
        </div>
      </div>

      {/* ===== Main Section ===== */}
      <div className=" py-16 px-6 md:px-20 lg:w-[80%] mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* ===== Left Sidebar ===== */}
          <div className="bg-white rounded-lg shadow-md p-3 space-y-5 h-fit border border-gray-300">

            <div className="flex items-center gap-3 text-gray-700 hover:text-blue-700 cursor-pointer hover:bg-[#1F2B6C] hover:text-white p-3 rounded-lg transition duration-300">
              <FaStethoscope className=" text-[#159EEC]" />
              <span>Free Checkup</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 hover:text-blue-700 cursor-pointer hover:bg-[#1F2B6C] hover:text-white p-3 rounded-lg transition duration-300">
              <FaHeartbeat className=" text-[#159EEC]" />
              <span>Cardiogram</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 hover:text-blue-700 cursor-pointer hover:bg-[#1F2B6C] hover:text-white p-3 rounded-lg transition duration-300">
              <FaVial className=" text-[#159EEC]" />
              <span>DNA Testing</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 hover:text-blue-700 cursor-pointer hover:bg-[#1F2B6C] hover:text-white p-3 rounded-lg transition duration-300">
              <FaTint className=" text-[#159EEC]" />
              <span>Blood Bank</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700 hover:text-blue-700 cursor-pointer hover:bg-[#1F2B6C] hover:text-white p-3 rounded-lg transition duration-300">
              <FaBone className=" text-[#159EEC]" />
              <span>Orthopedic</span>
            </div>

          </div>

          {/* ===== Right Content ===== */}
          <div className="md:col-span-2 lg:col-span-3">

            {/* Image */}
            <img
              src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
              alt="Free Checkup"
              className="w-full h-[350px] object-cover rounded-lg shadow-md"
            />

            {/* Content */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-blue-900">
                A passion for putting patients first
              </h2>

              {/* Bullet Points */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-gray-700">
                {[
                  "A Passion for Healing",
                  "5-Star Care",
                  "A Legacy of Excellence",
                  "All our best",
                  "Believe in Us",
                  "Always Caring",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mt-6 leading-relaxed">
                Our free health checkup service focuses on preventive care and
                early detection of potential health risks. Our experienced
                medical professionals conduct detailed examinations and provide
                expert guidance to help you maintain optimal health.
              </p>

              <p className="text-gray-600 mt-4 leading-relaxed">
                We are committed to delivering compassionate, patient-centered
                care using modern medical technology. Your health and comfort
                are always our top priorities.
              </p>

            </div>

          </div>

        </div>
      </div>
        <Doctors_Section/>
        <Contact_Section/>
    </div>
  );
};

export default SingleService;