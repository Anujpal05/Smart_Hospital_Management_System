import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

export default function DashboardNavbar() {
  return (
    <div className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">

      {/* LOGO */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-blue-900">
          MED<span className="text-blue-500">DICAL</span>
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-[400px]">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search doctors, reports..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            2
          </span>
        </div>

        {/* USER PROFILE */}
        <div className="flex items-center gap-3 cursor-pointer">

          <span className="text-gray-700 font-medium">
            John Doe
          </span>

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

        </div>

      </div>

    </div>
  );
}