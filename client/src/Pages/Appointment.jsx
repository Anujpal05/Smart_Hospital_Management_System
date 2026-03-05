import React from "react";
import Contact_Section from "../Components/Home/Contact_Section";
import { LuPhoneCall } from "react-icons/lu";

const Appointment = () => {
  return (
    <div className="bg-gray-100">
      {/* HERO SECTION */}
      <div
        className="h-[250px] flex items-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1584515933487-779824d29309)",
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative max-w-7xl px-4 lg:px-20">
          <p className="text-blue-900 text-sm">Home / Appointment</p>

          <h1 className="text-4xl font-bold text-blue-900 mt-2">
            Book an Appointment
          </h1>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-3 lg:px-6 py-16 grid lg:grid-cols-2 gap-10">
        {/* FORM */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Book an Appointment
          </h2>

          <p className="text-gray-600 mb-8">
            Schedule your visit with our experienced doctors. Fill the form
            below and our team will confirm your appointment shortly.
          </p>

          <form className="bg-[#1F2B6C] rounded-lg text-gray-200 ">
            <div className="grid grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="p-3 rounded bg-[#1F2B6C] border border-gray-500 placeholder-gray-200 outline-none"
              />

              <select className="p-3 rounded bg-[#1F2B6C] border border-gray-500 outline-none">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="grid grid-cols-2">
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded bg-[#1F2B6C] border border-gray-500 placeholder-gray-200 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone"
                className="p-3 rounded bg-[#1F2B6C] border border-gray-500 placeholder-gray-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 ">
              <input
                type="date"
                className="p-3 rounded bg-[#1F2B6C] border border-gray-500 outline-none"
              />

              <input
                type="time"
                defaultValue="05:00"
                className="p-3 rounded bg-[#1F2B6C] border border-gray-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 ">
              <select className="p-3 rounded bg-[#1F2B6C] border border-gray-500 outline-none">
                <option>Select Doctor</option>
                <option>Dr. Emily Carter</option>
                <option>Dr. Michael Anderson</option>
                <option>Dr. Sophia Martinez</option>
                <option>Dr. Daniel Lee</option>
              </select>

              <select className="p-3 rounded bg-[#1F2B6C] border border-gray-500 outline-none">
                <option>Department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
              </select>
            </div>

            <textarea
              placeholder="Message"
              rows="4"
              className="w-full p-3 rounded bg-[#1F2B6C] placeholder-gray-200 outline-none"
            ></textarea>

            <button className="w-full cursor-pointer bg-blue-300 text-blue-900 font-semibold py-3 rounded outline-none">
              SUBMIT
            </button>
          </form>
        </div>

        {/* SCHEDULE HOURS */}
        <div className="bg-[#1F2B6C] text-white rounded-lg p-5 lg:p-8  ">
          <h2 className="text-3xl text-[#BFD2F8] text-center font-bold mb-6">Schedule hours</h2>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-4">
              <span>Monday</span>
              <span>—</span>
              <span className=" col-span-2">09:00 AM - 07:00 PM</span>
            </div>

            <div className="grid grid-cols-4">
              <span>Tuesday</span>
              <span>—</span>

              <span className=" col-span-2">09:00 AM - 07:00 PM</span>
            </div>

            <div className="grid grid-cols-4">
              <span>Wednesday</span>
              <span>—</span>

              <span className=" col-span-2">09:00 AM - 07:00 PM</span>
            </div>

            <div className="grid grid-cols-4">
              <span>Thursday</span>
              <span>—</span>

              <span className=" col-span-2">09:00 AM - 07:00 PM</span>
            </div>

            <div className="grid grid-cols-4">
              <span>Friday</span>
              <span>—</span>

              <span className=" col-span-2">09:00 AM - 07:00 PM</span>
            </div>

            <div className="grid grid-cols-4">
              <span>Saturday</span>
              <span>—</span>

              <span className=" col-span-2">09:00 AM - 07:00 PM</span>
            </div>

            <div className="grid grid-cols-4 ">
              <span>Sunday</span>
              <span>—</span>
              <span>Closed</span>
            </div>
          </div>

          <hr className="my-6 border-blue-700" />

          <div className="flex justify-center items-center gap-4">
            <span className="text-3xl text-[#BFD2F8]"><LuPhoneCall /></span>

            <div>
              <p className="font-semibold">Emergency</p>
              <p className=" text-[#BFD2F8]">(237) 681-812-255</p>
            </div>
          </div>
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
      <Contact_Section />
    </div>
  );
};

export default Appointment;
