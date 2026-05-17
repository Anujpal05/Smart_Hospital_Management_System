import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";

const AppointmentSection = ({ appointments = [] }) => {
  // =========================
  // Demo Fallback Data
  // =========================
  const demoAppointments = [
    {
      id: 1,
      patient: "Maria Deo",
      diagnosis: "Over Setting",
      time: "11:00 AM",
      day: "Mon, 22 Dec 2021",
      doctor: "Dr. Ratian Deo",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Snan Deo",
      diagnosis: "Back Pain",
      time: "12:00 PM",
      day: "Tue, 22 Dec 2021",
      doctor: "Dr. Robert Bill",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Martin Deo",
      diagnosis: "Cold",
      time: "01:30 PM",
      day: "Sun, 09 Dec 2021",
      doctor: "Dr. John",
      status: "Cancelled",
    },
    {
      id: 4,
      patient: "Alexa Roy",
      diagnosis: "Fever",
      time: "02:00 PM",
      day: "Wed, 10 Dec 2021",
      doctor: "Dr. Smith",
      status: "Completed",
    },
    {
      id: 5,
      patient: "Riya Shah",
      diagnosis: "Health Checkup",
      time: "03:00 PM",
      day: "Thu, 12 Dec 2021",
      doctor: "Dr. Kumar",
      status: "Pending",
    },
    {
      id: 6,
      patient: "John Deo",
      diagnosis: "Migraine",
      time: "04:00 PM",
      day: "Fri, 14 Dec 2021",
      doctor: "Dr. Watson",
      status: "Completed",
    },
  ];

  // =========================
  // Dynamic Data
  // =========================
  const data = appointments.length ? appointments : demoAppointments;

  // =========================
  // States
  // =========================
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const itemsPerPage = 4;

  // =========================
  // Filter + Search + Sort
  // =========================
  const filteredAppointments = useMemo(() => {
    let filtered = [...data];

    // Search
    filtered = filtered.filter((item) =>
      `${item.patient} ${item.diagnosis} ${item.doctor}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    // Status Filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (item) => item.status === statusFilter
      );
    }

    // Sorting
    filtered.sort((a, b) =>
      sortAsc
        ? a.patient.localeCompare(b.patient)
        : b.patient.localeCompare(a.patient)
    );

    return filtered;
  }, [data, search, statusFilter, sortAsc]);

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(
    filteredAppointments.length / itemsPerPage
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = filteredAppointments.slice(
    indexOfFirst,
    indexOfLast
  );

  // Reset page on filter/search
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // =========================
  // Status Badge
  // =========================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";

      case "Pending":
        return "bg-yellow-100 text-yellow-600";

      case "Cancelled":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        {/* Left Controls */}
        <div className="flex flex-wrap gap-3">

          {/* Filter */}
          <div className="relative">
            <FaFilter className="absolute top-3 left-3 text-gray-400 text-sm" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm transition"
          >
            Sort: {sortAsc ? "A-Z" : "Z-A"}
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder="Search patient, diagnosis, doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <FaSearch className="absolute left-3 top-4 text-gray-400 text-sm" />
        </div>
      </div>

      {/* ================= TABLE HEADER ================= */}
      <div className="hidden md:grid grid-cols-5 bg-gray-50 rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 mb-2">
        <span>Patient</span>
        <span>Diagnosis</span>
        <span>Date & Time</span>
        <span>Doctor</span>
        <span>Status</span>
      </div>

      {/* ================= TABLE BODY ================= */}
      <div className="space-y-3">

        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center bg-gray-50 hover:bg-gray-100 transition rounded-2xl px-4 py-4"
            >
              {/* Patient */}
              <div>
                <p className="font-semibold text-gray-800">
                  {item.patient}
                </p>
              </div>

              {/* Diagnosis */}
              <div className="text-gray-600 text-sm">
                {item.diagnosis}
              </div>

              {/* Date & Time */}
              <div>
                <p className="font-medium text-gray-700">
                  {item.time}
                </p>

                <p className="text-xs text-gray-400">
                  {item.day}
                </p>
              </div>

              {/* Doctor */}
              <div className="text-blue-600 font-medium">
                {item.doctor}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No appointments found.
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">

        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaChevronLeft />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Next
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AppointmentSection;