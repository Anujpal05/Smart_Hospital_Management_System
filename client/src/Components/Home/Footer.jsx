import React from "react";
import {
  FaPaperPlane,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
    return (
       <div>
            <footer className="bg-[#1F2B6C] text-white lg:pt-16 p-4">

        <div className="lg:w-[85%] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + About */}
          <div className=" col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">MEDDICAL</h3>
            <p className="text-gray-300">
              Leading the Way in Medical Excellence, Trusted Care.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Appointment</li>
              <li>Doctors</li>
              <li>Services</li>
              <li>About Us</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-300">Call: (237) 681-812-255</p>
            <p className="text-gray-300">Email: fildineeseo@gmail.com</p>
            <p className="text-gray-300">Address: 0123 Some place</p>
            <p className="text-gray-300">Some country</p>
          </div>

          {/* Newsletter */}
          <div className=" col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <div className="flex items-center bg-[#BFD2F8] rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 outline-none text-black"
              />
              <button className="px-4 text-[#1F2B6C]">
                <FaPaperPlane />
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="lg:w-[85%] mx-auto border-t border-gray-500 my-8"></div>

        {/* Bottom Row */}
        <div className="lg:w-[85%] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-300 text-sm text-center">
            © 2021 Hospital’s name All Rights Reserved by PNTEC-LTD
          </p>

          <div className="flex gap-4">
            <div className="bg-white text-[#1F2B6C] p-2 rounded-full cursor-pointer">
              <FaLinkedinIn size={14} />
            </div>
            <div className="bg-white text-[#1F2B6C] p-2 rounded-full cursor-pointer">
              <FaFacebookF size={14} />
            </div>
            <div className="bg-white text-[#1F2B6C] p-2 rounded-full cursor-pointer">
              <FaInstagram size={14} />
            </div>
          </div>

        </div>

      </footer>

       </div>
    );
};

export default Footer;