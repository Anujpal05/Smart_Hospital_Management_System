import { FiCamera, FiPlus, FiMail } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import React from "react";
export default function ProfileSettings() {
  return (
    <div className="col-span-2 bg-white rounded-2xl p-6 shadow-md">

      <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>

      {/* PHOTO UPLOAD */}
      <div className="flex flex-col items-center mb-6">
        
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            <FiCamera size={28}/>
          </div>

          <button className="absolute -top-1 -right-1 bg-purple-100 p-1 rounded-full">
            <FiPlus size={12}/>
          </button>
        </div>

        <p className="text-blue-500 text-sm mt-2 cursor-pointer">
          Upload photo
        </p>

      </div>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4">

        <div className="">
          <label className="text-xs mr-3 text-gray-500">First Name</label>
          <input className="input" defaultValue="Clara"/>
        </div>

        <div className="">
          <label className="text-xs mr-3 text-gray-500">Last Name</label>
          <input className="input" defaultValue="Redfield"/>
        </div>

        <div className="">
          <label className="text-xs mr-3 text-gray-500">Prefix Title</label>
          <input className="input" defaultValue="Dr."/>
        </div>

        <div className="">
          <label className="text-xs mr-3 text-gray-500">Suffix Title</label>
          <input className="input"/>
        </div>

        <div className="col-span-2">
          <label className="text-xs mr-3 text-gray-500">Role</label>
          <select className="input">
            <option>General Practitioner (GP)</option>
          </select>
        </div>

        {/* PHONE */}
        <div className="col-span-2">
          <label className="text-xs text-gray-500">Phone Number</label>

          <div className="flex items-center gap-3">
            <input
              className="input flex-1"
              defaultValue="+62 8125 7789 655"
            />

            <span className="flex items-center text-green-500 text-sm gap-1">
              <MdVerified size={16}/>
              Verified
            </span>
          </div>
        </div>

        {/* EMAIL */}
        <div className="col-span-2">
          <label className="text-xs text-gray-500">Email</label>

          <div className="flex gap-3">
            <input
              disabled
              className="input flex-1 bg-gray-100"
              defaultValue="clara.redfield@gmail.com"
            />

            <button className="flex items-center gap-2 px-4 border rounded-lg text-sm">
              <FiMail/>
              Change Email
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}