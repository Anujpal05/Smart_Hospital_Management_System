import React from "react";
import { FaStethoscope } from "react-icons/fa";
import Contact_Section from "../Components/Home/Contact_Section";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "General Health Checkup",
    desc: "Comprehensive health examinations including blood tests, vital monitoring, and preventive screenings to ensure early detection and overall wellness.",
    img:"https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
},
  {
    id: 2,
    title: "Emergency Care",
    desc: "24/7 emergency medical support with experienced doctors and modern equipment to handle critical situations quickly and efficiently.",
    img:"https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
},
  {
    id: 3,
    title: "Cardiology Services",
    desc: "Advanced heart care services including ECG, stress tests, and expert consultation for diagnosing and managing cardiovascular conditions.",
    img:"https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
},
  {
    id: 4,
    title: "Laboratory Services",
    desc: "Accurate and fast diagnostic testing with modern laboratory technology to support precise medical decisions.",
    img:"https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
},
  {
    id: 5,
    title: "Pediatric Care",
    desc: "Dedicated child healthcare services focused on growth monitoring, vaccinations, and treatment in a safe and friendly environment.",
    img:"https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
},
  {
    id: 6,
    title: "Pharmacy Services",
    desc: "In-house pharmacy providing genuine medicines with proper guidance to ensure safe and effective treatment.",
    img:"https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png"
},
];

const Services = () => {
  return (
    <div className="w-full">
      {/* ===== Hero Section ===== */}
      <div className="relative w-full h-[250px]">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772539870/Rectangle_3_1_ftgmq7.png"
          alt="Services Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 text-[#1F2B6C]  bg-gray-200/60 flex flex-col justify-center px-6 lg:px-20">
          <p className=" text-sm">Home / Services</p>
          <h1 className=" text-4xl font-bold mt-2">Our Services</h1>
        </div>
      </div>

      {/* ===== Services Grid ===== */}
      <div className="bg-gray-100 py-16 px-6 md:px-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />

                {/* Circle Icon */}
                <div className="absolute -bottom-6 right-6 bg-blue-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                  <FaStethoscope />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-10">
                <h3 className="text-xl font-semibold text-blue-900">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {service.desc}
                </p>

                <button className="mt-4 text-blue-600  outline-none font-medium hover:underline flex items-center gap-2 cursor-pointer">
                  <Link to={`/services/free-checkup/`}>Learn More</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Contact_Section />
    </div>
  );
};

export default Services;
