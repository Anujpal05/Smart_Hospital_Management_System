import React from 'react'
import { Tooltip } from "react-tooltip";
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
  FaVideo,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as Tool,
} from "recharts";
import Calendar from '../Common/Calendar';
import { Link } from 'react-router-dom';
import { patients } from '../../../Data/patientdata';
import Scheduler from './BigCalender';
const chartData = [
  { name: "New Patients", value: 35 },
  { name: "Old Patients", value: 30 },
  { name: "Total Patients", value: 35 },
];

const COLORS = ["#3B82F6", "#FBBF24", "#1E40AF"];

const DashBoardMain = () => {
	const nextPatient =
  patients.find((p) => p.status === "On Going") ||
  patients.find((p) => p.status === "Upcoming");
  return (
	<>
					
					{/* ===== TOP CARDS ===== */}
					<div className="grid grid-cols-3 gap-6 mt-6">
						<StatCard title="Total Patient" value="2000+" />
						<StatCard title="Today Patient" value="068" />
						<StatCard title="Today Appointments" value="085" />
					</div>

					{/* ===== MIDDLE SECTION ===== */}
					<div className="grid grid-cols-3 gap-6 mt-8">

						{/* Chart */}
						<div className="bg-white p-6 rounded-2xl shadow-md">
						<h3 className="font-semibold mb-4">
							Patients Summary March 2026
						</h3>

						<div className="h-56">
							<ResponsiveContainer>
							<PieChart>
								<Pie
								data={chartData}
								innerRadius={60}
								outerRadius={90}
								dataKey="value"
								paddingAngle={3}
								>
								{chartData.map((entry, index) => (
									<Cell key={index} fill={COLORS[index]} />
								))}
								</Pie>
								<Tool/>
							</PieChart>
							</ResponsiveContainer>
						</div>

						{/* Legend */}
						<div className="mt-4 space-y-2 text-sm">
							{chartData.map((item, i) => (
							<div key={i} className="flex items-center space-x-2">
								<span
								className="w-3 h-3 rounded-full"
								style={{ background: COLORS[i] }}
								></span>
								<span>{item.name}</span>
							</div>
							))}
						</div>
						</div>

						{/* Today Appointment */}
						<div className="bg-white p-6 rounded-2xl shadow-md">
						<h3 className="font-semibold mb-4">Today Appointment</h3>

						{/* scroll container */}
						<div className="space-y-4 max-h-73.75 overflow-y-auto pr-2">
							{patients.map((p) => (
							<Appointment
								key={p.id}
								name={p.name}
								time={p.status === "On Going" ? "On Going" : p.appointment}
							/>
							))}
						</div>
						</div>

						 {/* NEXT PATIENT */}
						<div className="bg-white shadow-md p-6 rounded-2xl">

						<h3 className="text-gray-700 font-semibold mb-4">
							Next Patient Details
						</h3>

						{/* Profile */}
						<div className="flex items-center justify-between mb-4">

							<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">
								{nextPatient.name.slice(0,2).toUpperCase()}
							</div>

							<div>
								<p className="font-semibold text-gray-700">
								{nextPatient.name}
								</p>
								<p className="text-sm text-gray-500">
								{nextPatient.checkup}
								</p>
							</div>
							</div>

							<div className="text-right">
							<p className="text-sm text-gray-500">Patient ID</p>
							<p className="text-sm font-medium">{nextPatient.id}</p>
							</div>

						</div>


						{/* Info Grid */}
						<div className="grid grid-cols-2 gap-y-4 text-sm text-gray-600">

							<Info label="D.O.B" value={nextPatient.dob} />
							<Info label="Sex" value={nextPatient.sex} />
							<Info label="Weight" value={nextPatient.weight} />
							<Info label="Height" value={nextPatient.height} />

						</div>


						{/* Patient History */}
						<div className="mt-5">
							<p className="text-sm text-gray-500 mb-2">
							Patient History
							</p>

							<div className="flex gap-2 flex-wrap">
							{nextPatient.history.map((item, i) => (
								<span
								key={i}
								className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-md"
								>
								{item}
								</span>
							))}
							</div>

							<div className="flex gap-3 mt-6">

								{/* Video Call */}
								<button
									data-tooltip-id="videoTip"
									data-tooltip-content="Video Call"
									className="bg-blue-600 cursor-pointer text-white p-3 rounded-lg hover:bg-blue-700"
								>
									<FaVideo />
								</button>
								<Tooltip id="videoTip" place="bottom" />



								{/* Document */}
								<button
									data-tooltip-id="docTip"
									data-tooltip-content="Document"
									className="bg-gray-200 cursor-pointer p-3 rounded-lg hover:bg-gray-300"
								>
									<FaFileMedical />
								</button>
								<Tooltip id="docTip" place="bottom" />



								{/* Chat */}
								<button
									data-tooltip-id="chatTip"
									data-tooltip-content="Chat"
									className="bg-gray-200 cursor-pointer p-3 rounded-lg hover:bg-gray-300"
								>
									<FaCommentDots />
								</button>
								<Tooltip id="chatTip" place="bottom" />

								</div>
						</div>

						</div>	
					</div>

					{/* ===== BOTTOM SECTION ===== */}
					<div className="grid grid-cols-3 gap-6 mt-8">

						{/* Patient Review */}
						<div className="bg-white p-6 rounded-2xl shadow-md">
						<h3 className="font-semibold mb-4">Patients Review</h3>
						<Progress label="Excellent" percent={80} />
						<Progress label="Great" percent={60} />
						<Progress label="Good" percent={40} />
						<Progress label="Average" percent={25} />
						</div>

						{/* Appointment Request */}
						<div className="bg-white p-6 rounded-2xl shadow-md">
						<h3 className="font-semibold mb-4">Appointment Request</h3>

						<Request name="Maria Sarafat" />
						<Request name="Jhon Deo" />
						</div>

						{/* Calendar */}
					   <Calendar />

					</div>
					<Scheduler />
					
					</>
  )
}



function StatCard({ title, value }) {
  return (
    <div className="bg-[#eef2ff] p-6 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>
      <div className="w-12 h-12 rounded-full border-4 border-blue-600 flex items-center justify-center text-blue-600">
        <FaUsers />
      </div>
    </div>
  );
}

function Appointment({ name, time }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">Health Checkup</p>
        </div>
      </div>
      <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-lg">
        {time}
      </span>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Progress({ label, percent }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

function Request({ name }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">Cold</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="bg-green-100 text-green-600 p-2 rounded-lg">
          <FaCheck />
        </button>
        <button className="bg-red-100 text-red-600 p-2 rounded-lg">
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

function ActionBtn({ icon }) {
  return (
    <button className="bg-blue-100 text-blue-600 p-3 rounded-xl hover:bg-blue-200 transition">
      {icon}
    </button>
  );
}

export default DashBoardMain