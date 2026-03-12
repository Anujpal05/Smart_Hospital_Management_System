import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaCog,
  FaSignOutAlt,
  FaFileMedical,
  FaFileInvoice
} from "react-icons/fa";

export default function DoctorDashboardLayout() {

  return (
    <div className="min-h-screen bg-[#eef2ff] p-6 font-sans">

      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden">

        {/* SIDEBAR */}
        <div className="w-64 bg-white p-6">

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              DM
            </div>

            <h2 className="mt-4 font-semibold text-lg text-gray-800">
              Dr. Martin Deo
            </h2>

            <p className="text-xs text-gray-500">
              MBBS, FCPS - MD (Medicine)
            </p>
          </div>

          <nav className="mt-10 space-y-3">

            <MenuItem icon={<FaUsers />} label="Dashboard" to="/doctor/dashboard" />
            <MenuItem icon={<FaCalendarAlt />} label="Appointment" to="/doctor/appointments" />
            <MenuItem icon={<FaFileMedical />} label="Appointment Page" to="/doctor/appointments-page" />
            <MenuItem icon={<FaFileInvoice />} label="Lab Reports" to="/doctor/lab-reports" />
            <MenuItem icon={<FaClock />} label="Payment" to="/doctor/payment" />
            <MenuItem icon={<FaUserMd />} label="Profile" to="/doctor/profile" />

            {/* <MenuItem icon={<FaCog />} label="Settings" to="/doctor/settings" /> */}
            <MenuItem icon={<FaSignOutAlt />} label="Logout" to="/logout" />

          </nav>

        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-gray-50 p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

function MenuItem({ icon, label, to }) {

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 p-3 rounded-xl transition ${
          isActive
            ? "bg-blue-50 text-blue-600 font-medium"
            : "hover:bg-gray-100 text-gray-600"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}