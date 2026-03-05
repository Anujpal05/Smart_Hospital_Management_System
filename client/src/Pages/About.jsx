import React from "react";
import Doctors_Section from "../Components/Home/Doctors_Section";
import News_Section from "../Components/Home/News_Section";
import Contact_Section from "../Components/Home/Contact_Section";

const About = () => {
  return (
    <div className="w-full">
      {/* ===== Hero Section ===== */}
      <div className="relative w-full h-[300px]">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1771861269/Blackdoctors_1_zlhzrm.png"
          alt="Doctors"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 text-[#1F2B6C] bg-gray-200/60 flex flex-col justify-center px-6 lg:px-20">
          <p className=" text-sm">Home / About</p>
          <h1 className=" text-4xl font-bold mt-2">About us</h1>
        </div>
      </div>

      {/* ===== About Content Section ===== */}
      <div className=" py-16 px-6 md:px-20 lg:w-[80%] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div>
            <img
              src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772538319/Rectangle_3_fyorrj.png"
              alt="Nurses"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div>
            <p className="text-[#159EEC] font-semibold tracking-widest text-sm">
              WELCOME TO HOSPITAL NAME
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-3">
              Best Care for Your <br /> Good Health
            </h2>

            {/* Bullet Points */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
              {[
                "A Passion for Healing",
                "5-Star Care",
                "All our best",
                "Believe in Us",
                "Always Caring",
                "A Legacy of Excellence",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 mt-6 leading-relaxed">
              At our hospital, we are dedicated to providing high-quality
              healthcare services with compassion and integrity. Our experienced
              medical team combines advanced technology with personalized
              treatment plans to ensure accurate diagnosis, effective care, and
              faster recovery for every patient.
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              We believe that true healthcare goes beyond treatment — it is
              about building trust, offering comfort, and supporting our
              patients at every stage of their health journey. Your well-being
              is our highest priority.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Testimonial Section ===== */}
      <div className="relative w-full py-20">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772538319/Rectangle_53_mg8otk.png"
          alt="Doctor Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-blue-900/80"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white px-6">
          <div className="text-5xl font-bold mb-6">“</div>

          <p className="text-lg leading-relaxed">
            The care and attention I received here truly exceeded my
            expectations. The doctors took the time to listen, explain every
            step of the treatment, and made me feel comfortable throughout my
            recovery. I am grateful for their professionalism, kindness, and
            dedication to patient well-being.
          </p>

          <div className="mt-6 font-semibold text-lg">Rahul Mehta</div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
      <Doctors_Section />
      <News_Section />
      <Contact_Section />
    </div>
  );
};

export default About;
