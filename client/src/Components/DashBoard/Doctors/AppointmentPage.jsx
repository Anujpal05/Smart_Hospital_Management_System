import React from 'react'
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaUserMd,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AppointmentPage = () => {

  /* ================= Dummy Data ================= */

  const stats = [
    { title: "Total Appointments", value: 185 },
    { title: "Pending", value: 32 },
    { title: "Completed", value: 120 },
    { title: "Cancelled", value: 33 },
  ];

  const chartData = [
    { day: "Mon", appointments: 20 },
    { day: "Tue", appointments: 35 },
    { day: "Wed", appointments: 25 },
    { day: "Thu", appointments: 40 },
    { day: "Fri", appointments: 30 },
  ];

  const appointments = [
    {
      id: 1,
      patient: "Sanath Deo",
      doctor: "Dr. Martin",
      date: "05 Mar 2026",
      time: "12:30 PM",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Maria Sarafat",
      doctor: "Dr. Martin",
      date: "05 Mar 2026",
      time: "01:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Jhon Deo",
      doctor: "Dr. Martin",
      date: "06 Mar 2026",
      time: "02:30 PM",
      status: "Cancelled",
    },
  ];

  /* ================= JSX ================= */

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-8">

      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-semibold">Appointments</h1> */}

        <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search appointment..."
            className="outline-none text-sm"
          />
        </div>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FaCalendarAlt />
            </div>
          </div>
        ))}
      </div>

      {/* ===== Chart Section ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
        <h3 className="font-semibold mb-4">Weekly Appointment Overview</h3>

        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Bar dataKey="appointments" fill="#3B82F6" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Appointment Table ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="font-semibold mb-4">Appointment List</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-3">Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {item.patient.charAt(0)}
                      </div>
                      <span>{item.patient}</span>
                    </div>
                  </td>
                  <td>{item.doctor}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <div className="flex justify-center space-x-3 text-gray-500">
                      <FaEye className="cursor-pointer hover:text-blue-600" />
                      <FaEdit className="cursor-pointer hover:text-green-600" />
                      <FaTrash className="cursor-pointer hover:text-red-600" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

/* ================= Status Badge Component ================= */

const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-600",
    Completed: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

export default AppointmentPage;