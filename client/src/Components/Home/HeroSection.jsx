import React from "react";

const HeroSection = ()=>{
    return(
        <div>
            <div className=" h-fit bg-gray-200 ">
            <img src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1771845100/Screenshot_2026-02-23_164049_gatgqy.png" alt="Hero Section" className="bg-blue-900 h-fit w-full" />
            
        </div>
        <div className=" lg:flex justify-center p-5 relative -top-14 hidden ">
                <div className="flex items-center gap-20">
                <div className=" bg-blue-800 flex items-center gap-10 p-4 rounded-md text-gray-200">
                    <p className=" font-semibold">Book an Appointment</p>
                    <img src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1771861270/39.-Calendar_p5zwfl.png" alt="calendar" className=" "/>
                </div>
                <div className=" bg-blue-200 flex items-center gap-10 p-4 rounded-md ">
                    <p className=" font-semibold">Contact Doctor</p>
                    <img src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1771861269/27.-Team_vrcg2u.png" alt="contact" className="" />
                </div>
                <div className=" bg-blue-500 flex items-center gap-10 p-4 rounded-md text-gray-200">
                    <p className=" font-semibold">Pay Online</p>
                    <img src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1771861268/15.-Cash_sxizci.png" alt="money" />
                </div>
            </div>
            </div>
        </div>
    );
}

export default HeroSection;
