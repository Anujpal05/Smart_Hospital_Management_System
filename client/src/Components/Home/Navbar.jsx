import React, { useState } from 'react';
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';





const Navbar = () => {
    const [open , setOPen] = useState(false);

  return (
    <nav className=" ">
            <div className=' hidden lg:block'>
                <div className=' bg-gray-200 h-16 flex items-center p-4'>
            <h1 className="text-3xl font-bold text-blue-900 pl-32">MED<span className=' text-blue-500'>DICAL</span></h1>
         <div className='flex justify-between gap-12 mx-12 ml-32'>
            <div className="ml-auto flex items-center gap-4">
            <BiPhoneCall className="text-2xl text-blue-900" />
            <div className=' flex flex-col justify-center'>
                <span className=' text-md text-blue-900'>EMERGENCY</span>
            <span className="text-md text-blue-500">+1 234 567 890</span>
            </div>
         </div>
         <div className="ml-auto flex items-center gap-4">
            <MdOutlineWatchLater className="text-2xl text-blue-900" />
            <div className=' flex flex-col justify-center'>
                <span className=' text-md text-blue-900'>WORK HOUR</span>
            <span className="text-md text-blue-500">09:00 - 20:00 Everyday</span>
            </div>
         </div>
         <div className="ml-auto flex items-center gap-4">
            <IoLocationSharp className="text-2xl text-blue-900" />
            <div className=' flex flex-col justify-center'>
                <span className=' text-md text-blue-900'>LOCATION</span>
            <span className="text-md text-blue-500">123 Main Street, Ahmedabad</span>
            </div>
         </div>
         </div>
         </div>

         <div className=' flex  justify-between items-center font-semibold px-[200px] py-4 text-gray-200 bg-blue-900'>
            <div className=' '>
                <ul className=' flex gap-8'>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/">Home</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/about">About us</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/services">Services</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/doctors">Doctors</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/news">News</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/contact">Contact</Link></li>
                </ul>                  
            </div>
            <div className=' flex items-center gap-8'>
                <div className=' cursor-pointer'>
                    <FaSearch className=' text-gray-200 text-lg' />
                </div>
                <div>
                    <button className=' bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-full cursor-pointer'>Appointment</button>
                </div>
            </div>
         </div>
            </div>
            <div className=' lg:hidden flex justify-between items-center font-semibold px-4 py-4 text-gray-200 bg-blue-900 relative'>
                <h1 className="text-xl font-bold text-blue-300">MED<span className=' text-white'>DICAL</span></h1>
                <div className=' flex items-center gap-6'>
                    <button className=" text-2xl text-white outline-none cursor-pointer">
                    <FaSearch />
                </button>
                <button className=" text-4xl text-white  outline-none cursor-pointer" onClick={() => setOPen(!open)}>
                    {open ? <RxCross1/> : <IoReorderThreeOutline/>}
                </button>
                </div>
            </div>

        {
            open && (
                <div className=' absolute top-16 left-0 w-full bg-blue-900 text-gray-200 flex flex-col items-center gap-4 py-4 lg:hidden z-20'>
                    <ul className=' flex flex-col gap-4'>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/">Home</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/about">About us</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/services">Services</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/doctors">Doctors</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/news">News</Link></li>
                    <li className=' cursor-pointer hover:text-gray-300'><Link to="/contact">Contact</Link></li>
                </ul> 
                <div>
                    <button className=' bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-full cursor-pointer'>Appointment</button>
                </div>
                </div>
            )
        }
    </nav>
  );
}  
export default Navbar;