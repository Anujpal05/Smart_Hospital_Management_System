import React from "react";
import { TbCheckupList } from "react-icons/tb";
import { GiHeartPlus } from "react-icons/gi";
import { PiDnaBold } from "react-icons/pi";
import { MdBloodtype } from "react-icons/md";



const Service = ()=>{
    return(
        <div className=" py-10">
            <h2 className=" text-md font-bold text-center text-blue-400">CARE YOU CAN BELIEVE IN</h2>
            <h1 className=" text-2xl font-bold text-center text-purple-900">Our Services</h1>

            <div className="  lg:py-8 py-4 ">
                <div className=" lg:flex justify-center gap-10 lg:px-20 px-5">
                <div className=" lg:flex flex-col border border-[1px] border-gray-400 rounded-md grid grid-cols-2  gap-4 lg:p-">
                    <div className=" flex flex-col items-center justify-center lg:py-6 lg:px-7 p-5 hover:bg-blue-800 transition duration-300 hover:text-white cursor-pointer">
                        <span><TbCheckupList className="text-2xl text-blue-500"/></span>
                        <span>Free Checkup</span>
                    </div>
                    <div className=" flex flex-col items-center justify-center lg:py-6  lg:px-7 p-5 hover:bg-blue-800 transition duration-300 hover:text-white cursor-pointer">
                        <span><GiHeartPlus className="text-2xl text-blue-500"/></span>
                        <span>Cardiogram</span>
                    </div>
                    <div className=" flex flex-col items-center justify-center lg:py-6  lg:px-7 p-5 hover:bg-blue-800 transition duration-300 hover:text-white cursor-pointer">
                        <span><PiDnaBold className="text-2xl text-blue-500"/></span>
                        <span>DNA Testing</span>
                    </div>
                    <div className=" flex flex-col items-center justify-center lg:py-6  lg:px-7 p-5 hover:bg-blue-800 transition duration-300 hover:text-white  cursor-pointer">
                        <span><MdBloodtype className="text-2xl text-blue-500"/></span>
                        <span>Blood Bank</span>
                    </div>
                    <div className=" bg-blue-900 text-gray-200 text-center p-2 col-span-2">
                        View All
                    </div>
                </div>
                <div className="hidden lg:block w-2/5   ">
                    <h2 className=" text-xl font-bold font-semibold">A passion for putting patients first.</h2>
                    <div className=" grid grid-cols-2 gap-20 mt-4">
                        <ul className=" list-disc marker:text-blue-600">
                            <li>A Passion for Healing</li>
                            <li>All our best</li>
                            <li>A Legacy of Excellence</li>
                        </ul>
                        <ul className=" list-disc marker:text-blue-600">
                            <li>5-Star Care</li>
                            <li>Believe in Us</li>
                            <li>Always Caring</li>
                        </ul>
                    </div>
                    <div className="py-8">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. 
        Convallis felis vitae tortor augue. Velit naassa in. Consequat faucibus porttitor enim.</p>
       <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. 
        Convallis felis vitae tortor augue. Velit nascetur pronascetur proin massa in. Consequat faucibus porttitor enim.</p>
                    </div>
                </div>
                <div className=" hidden lg:block">
                    <img src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_13_1_dxksno.png" alt="service img1" />
                    <img src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214253/Rectangle_14_1_zmz0dt.png" alt="service img2" />
                </div>
            </div>
            </div>
        </div>
    );
}

export default Service;