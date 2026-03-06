import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaCog,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
  FaPhoneAlt,
  FaFileMedical,
  FaCommentDots,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Calendar from "../../Components/DashBoard/Common/Calendar";
import AppointmentPage from "../../Components/DashBoard/Doctors/AppointmentPage";
import TodayAppointments from "../../Components/DashBoard/Doctors/TodayAppointments";
import AppointmentSection from "../../Components/DashBoard/Doctors/AppointmentSection";
import DashBoardMain from "../../Components/DashBoard/Doctors/DashBoardMain";
import Payment from "../../Components/DashBoard/Doctors/Payment";
import Profile from "../../Components/DashBoard/Common/Profile";

/* ================== DATA ================== */
const sidebarpanner = {
	dashboardmain : "DashboardMain",
	appointment : "Appointment",
	appointmentPage : "AppointmentPage",
	payment : "Payment",
	profile : "Profile"
}

/* ================== MAIN ================== */

export default function Dashboard() {
	const [sidebarlink , setIssidebarLink] = useState(sidebarpanner.dashboardmain);
	// const [isTodayAppointmentpageopen , setIsTodayAppointmentpageopen] = useState(false);
  return (
    <div className="min-h-screen bg-[#eef2ff] p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden">

        {/* ================= SIDEBAR ================= */}
        <div className="w-64 bg-white border-r p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              DM
            </div>
            <h2 className="mt-4 font-semibold text-lg text-gray-800">
              Dr. Martin Deo
            </h2>
            <p className="text-xs text-gray-500 text-center">
              MBBS, FCPS - MD (Medicine)
            </p>
          </div>

          <nav className="mt-10 space-y-3 text-gray-600">
            <MenuItem onClick={()=>setIssidebarLink(sidebarpanner.dashboardmain)} icon={<FaUsers />} label="Dashboard" active={sidebarpanner.dashboardmain == sidebarlink} />
            <MenuItem onClick={()=>setIssidebarLink(sidebarpanner.appointment)} icon={<FaCalendarAlt />} label="Appointment"  active={sidebarpanner.appointment == sidebarlink} />
            <MenuItem onClick={()=>setIssidebarLink(sidebarpanner.appointmentPage)} icon={<FaFileMedical />}  active={sidebarpanner.appointmentPage == sidebarlink} label="Appointment Page" />
            <MenuItem onClick={()=>setIssidebarLink(sidebarpanner.payment)} icon={<FaClock />}  active={sidebarpanner.payment == sidebarlink} label="Payment" />
            <MenuItem onClick={()=>setIssidebarLink(sidebarpanner.profile)} icon={<FaUserMd />}  active={sidebarpanner.profile == sidebarlink} label="Profile" />
            <MenuItem icon={<FaCog />} label="Settings" />
            <MenuItem icon={<FaSignOutAlt />} label="Logout" />
          </nav>
        </div>
			
			<>
			   {/* ================= MAIN ================= */}
					<div className="flex-1 bg-[#f8f9fd] p-8">

					{/* Header */}
					<h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
					{sidebarlink == sidebarpanner.dashboardmain && <DashBoardMain /> }
					{sidebarlink == sidebarpanner.appointment && <AppointmentSection /> }
					{sidebarlink == sidebarpanner.appointmentPage && <AppointmentPage /> }
					{sidebarlink == sidebarpanner.payment && <Payment /> }
					{sidebarlink == sidebarpanner.profile && <Profile /> }

					</div>
			</>
		
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MenuItem({ icon,onClick, label, active }) {
  return (
    <div
	onClick={onClick}
	className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition ${
      active
        ? "bg-blue-50 text-blue-600 font-medium"
        : "hover:bg-gray-100"
    }`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
