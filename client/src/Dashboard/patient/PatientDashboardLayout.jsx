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
  FaFileInvoice,
  FaCapsules,
  FaFacebookMessenger
} from "react-icons/fa";
import { BrainCircuit } from "lucide-react";


const PatientDashboardLayout = () => {
   return (
    <div className="min-h-screen  bg-white font-sans">

      <div className="bg-white flex overflow-hidden">

        {/* SIDEBAR */}
        <div className="w-64 bg-white p-6">

          <nav className="mt-2 space-y-3">

            <MenuItem icon={<FaUsers />} label="Dashboard" to="/patient/dashboard" />
            <MenuItem icon={<FaCalendarAlt />} label="Appointment" to="/patient/appointments" />
            <MenuItem icon={<BrainCircuit />} label="AI Assistant" to="/patient/ai-assistant" isNew={true} />
            <MenuItem icon={<FaFileMedical />} label="Medical Records" to="/patient/medical-records" />
            <MenuItem icon={<FaCapsules />} label="Madications" to="/patient/madications" />
            <MenuItem icon={<FaFacebookMessenger />} label="Messages" to="/patient/Messages" />
            <MenuItem icon={<FaUserMd />} label="Profile" to="/patient/profile" />

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

function MenuItem({ icon, label, to , isNew = false }) {

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
         {isNew && <span className="bg-amber-400 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-md animate-pulse">NEW</span>}

    </NavLink>
  );
}

export default PatientDashboardLayout
