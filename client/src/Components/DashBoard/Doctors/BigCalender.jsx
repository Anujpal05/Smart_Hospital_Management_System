import React, { useMemo, useState } from "react";

import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaSearch,
  FaVideo,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// =======================================
// DUMMY DATA
// =======================================

const initialAppointments = [
  {
    id: "APT001",
    patientName: "John Deo",
    doctor: "Dr. Smith",
    type: "Video Consultation",
    date: "2026-05-17",
    time: "10:00 AM",
    status: "Upcoming",
  },

  {
    id: "APT002",
    patientName: "Maria Watson",
    doctor: "Dr. Alex",
    type: "Dental Checkup",
    date: "2026-05-17",
    time: "11:30 AM",
    status: "Completed",
  },

  {
    id: "APT003",
    patientName: "Rahul Sharma",
    doctor: "Dr. Williams",
    type: "Heart Checkup",
    date: "2026-05-18",
    time: "01:00 PM",
    status: "Pending",
  },

  {
    id: "APT004",
    patientName: "Emma Stone",
    doctor: "Dr. Brown",
    type: "Eye Specialist",
    date: "2026-05-18",
    time: "03:00 PM",
    status: "Upcoming",
  },
];

// =======================================
// STATUS COLORS
// =======================================

const statusColors = {
  Upcoming: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

// =======================================
// MAIN COMPONENT
// =======================================

const Scheduler = () => {
  const [appointments, setAppointments] =
    useState(initialAppointments);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] =
    useState("");

  // =======================================
  // FILTERED DATA
  // =======================================

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {

      const matchesSearch =
        appointment.patientName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        appointment.doctor
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        filter === "All"
          ? true
          : appointment.status === filter;

      const matchesDate =
        selectedDate
          ? appointment.date === selectedDate
          : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [appointments, search, filter, selectedDate]);

  // =======================================
  // UPDATE STATUS
  // =======================================

  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6 mt-8">

      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">

            <FaCalendarAlt className="text-blue-600" />

            Doctor Appointment Scheduler
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage patient appointments easily
          </p>
        </div>

        {/* FILTERS */}

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

          {/* SEARCH */}

          <div className="relative flex-1">

            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search patient or doctor..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* STATUS FILTER */}

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Upcoming">
              Upcoming
            </option>
            <option value="Completed">
              Completed
            </option>
            <option value="Pending">
              Pending
            </option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          {/* DATE FILTER */}

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* MOBILE VIEW */}

      <div className="grid grid-cols-1 xl:hidden gap-4">

        {filteredAppointments.length === 0 ? (
          <EmptyState />
        ) : (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              updateStatus={updateStatus}
            />
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden xl:block overflow-x-auto rounded-2xl border border-gray-100">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-gray-50 text-sm uppercase tracking-wide text-gray-600">

            <tr>
              <th className="text-left px-6 py-4">
                Patient
              </th>

              <th className="text-left px-6 py-4">
                Doctor
              </th>

              <th className="text-left px-6 py-4">
                Type
              </th>

              <th className="text-left px-6 py-4">
                Date
              </th>

              <th className="text-left px-6 py-4">
                Time
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredAppointments.length === 0 ? (

              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-400"
                >
                  No appointments found.
                </td>
              </tr>

            ) : (

              filteredAppointments.map(
                (appointment) => (

                  <tr
                    key={appointment.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {appointment.patientName}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      <div className="flex items-center gap-2">

                        <FaUserMd className="text-blue-600" />

                        {appointment.doctor}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {appointment.type}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {appointment.date}
                    </td>

                    <td className="px-4 py-4 text-gray-600">

                      <div className="flex items-center gap-2">

                        <FaClock className="text-gray-400" />

                        {appointment.time}
                      </div>
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[appointment.status]}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">

                      <div className="flex gap-2 flex-wrap">

                        <button
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "Completed"
                            )
                          }
                          className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
                        >
                          <FaCheckCircle />
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "Cancelled"
                            )
                          }
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >
                          <FaTimesCircle />
                        </button>

                        <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition">

                          <FaVideo />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// =======================================
// MOBILE CARD
// =======================================

const AppointmentCard = ({
  appointment,
  updateStatus,
}) => {
  return (
    <div className="border border-gray-100 rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="font-semibold text-gray-800 text-lg">
            {appointment.patientName}
          </h3>

          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">

            <FaUserMd className="text-blue-600" />

            {appointment.doctor}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[appointment.status]}`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

        <Info label="Type" value={appointment.type} />

        <Info label="Date" value={appointment.date} />

        <Info label="Time" value={appointment.time} />

        <Info
          label="Appointment ID"
          value={appointment.id}
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-5">

        <button
          onClick={() =>
            updateStatus(
              appointment.id,
              "Completed"
            )
          }
          className="flex-1 min-w-[120px] bg-green-100 text-green-700 py-3 rounded-xl hover:bg-green-200 transition font-medium"
        >
          Complete
        </button>

        <button
          onClick={() =>
            updateStatus(
              appointment.id,
              "Cancelled"
            )
          }
          className="flex-1 min-w-[120px] bg-red-100 text-red-700 py-3 rounded-xl hover:bg-red-200 transition font-medium"
        >
          Cancel
        </button>

        <button className="flex-1 min-w-[120px] bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-200 transition font-medium">
          Video Call
        </button>
      </div>
    </div>
  );
};

// =======================================
// INFO
// =======================================

const Info = ({ label, value }) => (
  <div>

    <p className="text-gray-400 text-xs uppercase tracking-wide">
      {label}
    </p>

    <p className="font-medium text-gray-700 mt-1">
      {value}
    </p>
  </div>
);

// =======================================
// EMPTY STATE
// =======================================

const EmptyState = () => (
  <div className="text-center py-14 text-gray-400 bg-gray-50 rounded-2xl border border-dashed">
    No appointments available.
  </div>
);

export default Scheduler;