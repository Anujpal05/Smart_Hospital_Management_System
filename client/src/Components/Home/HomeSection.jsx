import React from "react";
import { FaHeartbeat } from "react-icons/fa";
import { FaEye, FaHeart } from "react-icons/fa";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const newsData = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772291807/photo-1582750433449-648ed127bb54_qjkmxu.jpg",
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article’s Title goes Here, but not too long.",
    views: 68,
    likes: 86,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772291807/photo-1582750433449-648ed127bb54_qjkmxu.jpg",
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article’s Title goes Here, but not too long.",
    views: 68,
    likes: 86,
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772291807/photo-1582750433449-648ed127bb54_qjkmxu.jpg",
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article’s Title goes Here, but not too long.",
    views: 68,
    likes: 86,
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772291807/photo-1582750433449-648ed127bb54_qjkmxu.jpg",
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article’s Title goes Here, but not too long.",
    views: 68,
    likes: 86,
  },
];



const doctors = [
  {
    id: 1,
    name: "Doctor’s Name",
    specialty: "NEUROLOGY",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_1_iqcqu9.png",
  },
  {
    id: 2,
    name: "Doctor’s Name",
    specialty: "NEUROLOGY",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_2_asahdp.png",
  },
  {
    id: 3,
    name: "Doctor’s Name",
    specialty: "NEUROLOGY",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_i1gcfr.png",
  },
];





const HomeSection = () => {
    return (
        //Section 1 - Specialties
    <div className="">
        <div className=" w-[80%] mx-auto py-10 hidden lg:block">
        <h2 className=" text-md font-bold text-center text-blue-400">ALWAYS CARING</h2>
        <h1 className="text-2xl font-bold text-center text-purple-900">Our Specialties</h1>
        <div className=" grid grid-cols-4 pt-8">
            <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Neurology</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Bones</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Oncology</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Otorhinolaryngology</span>
        </div>
        </div>

        <div className=" grid grid-cols-4">
            <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Ophthalmology</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Cardiovascular</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Pulmonology</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Real Medicine</span>
        </div>
        </div>

        <div className=" grid grid-cols-4">
            <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Gastroenterology</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Urology</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Dermatology</span>
        </div>
        <div className=" flex flex-col items-center justify-center hover:bg-blue-900 transition duration-300 hover:text-white  border border-gray-300 cursor-pointer rounded-md px-15 py-6">
            <FaHeartbeat className="text-4xl text-blue-500 mx-auto mt-4"/>
            <span className=" text-md">Gynaecology</span>
        </div>
        </div>
    </div>

   {/* Section 2 - Book an Appointment */}
    <div className="relative lg:h-[600px] w-full flex items-center justify-center">

  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772279951/Rectangle_33_tkmadg.png')] bg-cover bg-center"></div>

  {/* Overlay (controls opacity) */}
  <div className="absolute inset-0 bg-gray-300/80"></div>

  {/* Content */}
  <div className=" relative z-10 w-full text-white text-center py-5">
    <div className=" grid lg:grid-cols-2">
        <div className=" flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-500">
      Book an Appointment
    </h1>
    <p className="text-sm mt-4 text-black w-[80%] mx-auto">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
      placerat scelerisque tortor ornare ornare. Convallis felis vitae
      tortor augue. Velit naassa in. Consequat faucibus porttitor enim.
    </p>
    </div>

     <div className="p-4 py-6">
    <form className="bg-[#1F2B6C] lg:w-[80%] mx-auto rounded-md overflow-hidden">
  <div className="grid grid-cols-1 md:grid-cols-2">

    {/* Name */}
    <input
      type="text"
      placeholder="Name"
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
    />

    {/* Gender */}
    <select
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
    >
      <option className="text-black">Gender</option>
      <option className="text-black">Male</option>
      <option className="text-black">Female</option>
    </select>

    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
    />

    {/* Phone */}
    <input
      type="tel"
      placeholder="Phone"
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
    />

    {/* Date */}
    <input
      type="date"
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
      placeholder="Date"
    />

    {/* Time */}
    <input
      type="time"
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
      placeholder="Time"
      defaultValue="05:00"

    />

    {/* Doctor */}
    <select
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
    >
      <option className="text-black">Doctor</option>
      <option className="text-black">Dr. Smith</option>
    </select>

    {/* Department */}
    <select
      className="border border-gray-300 p-3 bg-transparent text-white outline-none"
    >
      <option className="text-black">Department</option>
      <option className="text-black">Cardiology</option>
    </select>

    {/* Message (Full Width) */}
    <textarea
      placeholder="Message"
      rows="4"
      className="col-span-1 md:col-span-2 border border-gray-300 p-3 bg-transparent text-white outline-none"
    ></textarea>

    {/* Submit Button (Full Width) */}
    <button
      type="submit"
      className="col-span-1 md:col-span-2 bg-[#BFD2F8] text-black font-semibold py-3"
    >
      Submit
    </button>

  </div>

</form>
  </div>
    </div>
  </div> 

</div>

        {/* Section 3 - Doctors */}
  <section className="bg-gray-100 py-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-blue-500 tracking-widest font-semibold">
          TRUSTED CARE
        </p>
        <h2 className="text-4xl font-bold text-[#1F2B6C] mt-2">
          Our Doctors
        </h2>
      </div>

      {/* Cards */}
      <div className=" p-3 lg:w-[80%] mx-auto flex  overflow-x-auto lg:grid md:grid-cols-2 lg:grid-cols-3 gap-8 scrollbar-">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg flex-shrink-0 overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full  object-cover"
            />

            {/* Card Content */}
            <div className="bg-[#BFD2F8] text-center py-6">
              <h3 className="text-lg font-medium text-[#1F2B6C]">
                {doctor.name}
              </h3>
              <p className="tracking-widest text-sm font-bold text-[#1F2B6C] mt-1">
                {doctor.specialty}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-4">
                <div className="bg-[#1F2B6C] text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <FaLinkedinIn size={14} />
                </div>
                <div className="bg-[#1F2B6C] text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <FaFacebookF size={14} />
                </div>
                <div className="bg-[#1F2B6C] text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <FaInstagram size={14} />
                </div>
              </div>
            </div>

            {/* View Profile */}
            <div className="bg-[#1F2B6C] text-white text-center py-3 cursor-pointer hover:bg-blue-900 transition">
              View Profile
            </div>
          </div>
        ))}
      </div>

      {/* Slider Dots */}
      <div className="flex justify-center gap-3 mt-10">
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className="w-3 h-3 bg-[#1F2B6C] rounded-full"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>

    </section>

    {/* Section 4 - News */}
    <section className="bg-gray-100 lg:py-16 py-6">

      {/* Heading */}
      <div className="text-center lg:mb-12 mb-5">
        <p className="text-blue-500 tracking-widest font-semibold">
          BETTER INFORMATION, BETTER HEALTH
        </p>
        <h2 className="text-4xl font-bold text-[#1F2B6C] mt-2">
          News
        </h2>
      </div>

      {/* News Grid */}
      <div className="lg:w-[85%] p-3 mx-auto flex overflow-x-auto lg:grid grid-cols-1 md:grid-cols-2 gap-8">

        {newsData.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-lg flex-shrink-0 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex"
          >
            {/* Image */}
            <img
              src={news.image}
              alt="news"
              className="w-40 h-40 object-cover"
            />

            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm text-blue-500">
                  {news.date} | {news.author}
                </p>

                <h3 className="mt-2 text-lg font-medium text-gray-800">
                  {news.title}
                </h3>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <FaEye className="text-blue-500" />
                  {news.views}
                </div>

                <div className="flex items-center gap-2">
                  <FaHeart className="text-red-500" />
                  {news.likes}
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Slider Dots */}
      <div className="flex justify-center gap-3 mt-10">
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className="w-3 h-3 bg-[#1F2B6C] rounded-full"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>

    </section>

    <section className="bg-gray-100 lg:py-16 py-6">

        {/* Heading */}
        <div className="text-center lg:mb-12 mb-6">
          <p className="text-blue-500 tracking-widest font-semibold">
            GET IN TOUCH
          </p>
          <h2 className="text-4xl font-bold text-[#1F2B6C] mt-2">
            Contact
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Emergency */}
          <div className="bg-[#BFD2F8] p-8 rounded-md text-[#1F2B6C]">
            <FaPhoneAlt className="text-3xl mb-4" />
            <h3 className="font-bold mb-2">EMERGENCY</h3>
            <p>(237) 681-812-255</p>
            <p>(237) 666-331-894</p>
          </div>

          {/* Location */}
          <div className="bg-[#1F2B6C] text-white p-8 rounded-md">
            <FaMapMarkerAlt className="text-3xl mb-4" />
            <h3 className="font-bold mb-2">LOCATION</h3>
            <p>0123 Some place</p>
            <p>9876 Some country</p>
          </div>

          {/* Email */}
          <div className="bg-[#BFD2F8] p-8 rounded-md text-[#1F2B6C]">
            <FaEnvelope className="text-3xl mb-4" />
            <h3 className="font-bold mb-2">EMAIL</h3>
            <p>fildineeseo@gmail.com</p>
            <p>mybestudios@gmail.com</p>
          </div>

          {/* Working Hours */}
          <div className="bg-[#BFD2F8] p-8 rounded-md text-[#1F2B6C]">
            <FaClock className="text-3xl mb-4" />
            <h3 className="font-bold mb-2">WORKING HOURS</h3>
            <p>Mon-Sat 09:00-20:00</p>
            <p>Sunday Emergency only</p>
          </div>

        </div>
      </section>

    </div>
    );
}

export default HomeSection;