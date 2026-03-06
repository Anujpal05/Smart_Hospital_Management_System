import React, { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AppointmentSection = () => {
  const appointmentsData = [
    {
      id: 1,
      patient: "Maria Deo",
      diagnosis: "Over setting",
      date: "11:00 AM",
      day: "Mon, 22 Dec 2021",
      doctor: "Dr. Ratian Deo",
    },
    {
      id: 2,
      patient: "Snan Deo",
      diagnosis: "Back Pain",
      date: "11:00 AM",
      day: "Tue, 22 Dec 2021",
      doctor: "Dr. Robert Bill",
    },
    {
      id: 3,
      patient: "Martin Deo",
      diagnosis: "Back Pain",
      date: "01:30 PM",
      day: "Sun, 09 Dec 2021",
      doctor: "Dr. Robert Bill",
    },
    {
      id: 4,
      patient: "John Deo",
      diagnosis: "Health Checkup",
      date: "02:00 PM",
      day: "Wed, 10 Dec 2021",
      doctor: "Dr. Smith",
    },
    {
      id: 5,
      patient: "Alexa Roy",
      diagnosis: "Cold",
      date: "03:00 PM",
      day: "Thu, 12 Dec 2021",
      doctor: "Dr. John",
    },
    {
      id: 6,
      patient: "Riya Shah",
      diagnosis: "Fever",
      date: "04:00 PM",
      day: "Fri, 14 Dec 2021",
      doctor: "Dr. Kumar",
    },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(appointmentsData.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = appointmentsData.slice(indexOfFirst, indexOfLast);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">
            Filter
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
            Status
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-gray-500 text-sm font-medium px-4 pb-3 border-b">
        <span>Patient</span>
        <span>Name/Diagnosis</span>
        <span>Date & Time</span>
        <span>Doctor</span>
      </div>

      {/* Table Rows */}
      <div className="divide-y">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 items-center px-4 py-4 hover:bg-gray-50"
          >
            <span className="font-medium text-gray-700">
              {item.patient}
            </span>

            <span className="text-gray-600">
              {item.diagnosis}
            </span>

            <span className="text-gray-600">
              <div>{item.date}</div>
              <div className="text-xs text-gray-400">{item.day}</div>
            </span>

            <span className="text-blue-600 font-medium">
              {item.doctor}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
          }
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg"
        >
          <FaChevronLeft />
          <span>Previous</span>
        </button>

        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < totalPages ? prev + 1 : prev
            )
          }
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg"
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </div>

    </div>
  );
};

export default AppointmentSection;