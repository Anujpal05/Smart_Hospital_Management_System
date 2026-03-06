import React from "react";
import { FaEllipsisH } from "react-icons/fa";

const TodayAppointments = () => {

  const appointments = [
    {
      id: 1,
      name: "M.J. Mical",
      diagnosis: "Health Checkup",
      time: "On Going",
      status: "ongoing",
    },
    {
      id: 2,
      name: "Sanath Deo",
      diagnosis: "Health Checkup",
      time: "12:30 PM",
      status: "scheduled",
    },
    {
      id: 3,
      name: "Loeara Phanj",
      diagnosis: "Report",
      time: "01:00 PM",
      status: "scheduled",
    },
    {
      id: 4,
      name: "Komola Haris",
      diagnosis: "Common Cold",
      time: "01:30 PM",
      status: "scheduled",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Today Appointment
        </h3>
        <FaEllipsisH className="text-gray-400 cursor-pointer" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 text-xs text-gray-500 mb-3 px-2">
        <span>Patient</span>
        <span>Name/Diagnosis</span>
        <span className="text-right">Time</span>
      </div>

      {/* Appointment List */}
      <div className="space-y-3">
        {appointments.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-3 items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
          >
            
            {/* Avatar */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                {item.name.charAt(0)}
              </div>
            </div>

            {/* Name + Diagnosis */}
            <div>
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-gray-500">
                {item.diagnosis}
              </p>
            </div>

            {/* Time Badge */}
            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  item.status === "ongoing"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {item.time}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-blue-600 text-sm font-medium cursor-pointer hover:underline">
        See All
      </div>

    </div>
  );
};

export default TodayAppointments;