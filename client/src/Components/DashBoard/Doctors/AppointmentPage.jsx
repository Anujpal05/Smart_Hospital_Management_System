import React, { useMemo, useState } from "react";

import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ======================================================
// MAIN COMPONENT
// ======================================================

const AppointmentPage = () => {
  // ======================================================
  // STATES
  // ======================================================

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Sanath Deo",
      doctor: "Dr. Martin",
      date: "2026-03-05",
      time: "12:30 PM",
      status: "Pending",
    },

    {
      id: 2,
      patient: "Maria Sarafat",
      doctor: "Dr. Martin",
      date: "2026-03-05",
      time: "01:00 PM",
      status: "Completed",
    },

    {
      id: 3,
      patient: "Jhon Deo",
      doctor: "Dr. Robert",
      date: "2026-03-06",
      time: "02:30 PM",
      status: "Cancelled",
    },

    {
      id: 4,
      patient: "Alexa Roy",
      doctor: "Dr. Smith",
      date: "2026-03-07",
      time: "03:00 PM",
      status: "Completed",
    },

    {
      id: 5,
      patient: "Riya Shah",
      doctor: "Dr. Kumar",
      date: "2026-03-08",
      time: "11:00 AM",
      status: "Pending",
    },

    {
      id: 6,
      patient: "Martin Deo",
      doctor: "Dr. Watson",
      date: "2026-03-09",
      time: "04:00 PM",
      status: "Completed",
    },

    {
      id: 7,
      patient: "Anuj Pal",
      doctor: "Dr. Patel",
      date: "2026-03-10",
      time: "05:00 PM",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [openViewModal, setOpenViewModal] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [editAppointment, setEditAppointment] = useState(null);

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    status: "Pending",
  });

  const itemsPerPage = 5;

  // ======================================================
  // STATS
  // ======================================================

  const stats = useMemo(
    () => [
      {
        title: "Total",
        value: appointments.length,
        color: "bg-blue-100 text-blue-600",
      },

      {
        title: "Pending",
        value: appointments.filter((item) => item.status === "Pending").length,
        color: "bg-yellow-100 text-yellow-600",
      },

      {
        title: "Completed",
        value: appointments.filter((item) => item.status === "Completed")
          .length,
        color: "bg-green-100 text-green-600",
      },

      {
        title: "Cancelled",
        value: appointments.filter((item) => item.status === "Cancelled")
          .length,
        color: "bg-red-100 text-red-600",
      },
    ],
    [appointments],
  );

  const handleEditClick = (appointment) => {
    setEditAppointment(appointment);

    setOpenEditModal(true);
  };

  const handleUpdateAppointment = () => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === editAppointment.id ? editAppointment : item,
      ),
    );

    setOpenEditModal(false);
  };

  // ======================================================
  // CHART DATA
  // ======================================================

  const chartData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // initialize week data
    const weeklyData = days.map((day) => ({
      day,
      appointments: 0,
      completed: 0,
      cancelled: 0,
    }));

    appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date);

      const dayIndex = appointmentDate.getDay();

      // total appointments
      weeklyData[dayIndex].appointments += 1;

      // completed
      if (appointment.status === "Completed") {
        weeklyData[dayIndex].completed += 1;
      }

      // cancelled
      if (appointment.status === "Cancelled") {
        weeklyData[dayIndex].cancelled += 1;
      }
    });

    return weeklyData;
  }, [appointments]);

  // ======================================================
  // FILTERED APPOINTMENTS
  // ======================================================

  const filteredAppointments = useMemo(() => {
    let filtered = appointments.filter((item) =>
      `${item.patient} ${item.doctor} ${item.status}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

    if (statusFilter !== "All") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [appointments, search, statusFilter]);

  // ======================================================
  // PAGINATION
  // ======================================================

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;

  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = filteredAppointments.slice(indexOfFirst, indexOfLast);

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this appointment?");

    if (!confirmDelete) return;

    const updatedAppointments = appointments.filter((item) => item.id !== id);

    setAppointments(updatedAppointments);

    const newTotalPages = Math.ceil(updatedAppointments.length / itemsPerPage);

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  const StatBadge = ({ label, value, color }) => {
    const colors = {
      blue: "bg-blue-100 text-blue-700",

      green: "bg-green-100 text-green-700",

      red: "bg-red-100 text-red-700",
    };

    return (
      <div
        className={`px-4 py-2 rounded-2xl text-sm font-medium ${colors[color]}`}
      >
        {label}: {value}
      </div>
    );
  };

  // ======================================================
  // STATUS UPDATE
  // ======================================================

  const handleStatusChange = (id, status) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );
  };

  // ======================================================
  // ADD APPOINTMENT
  // ======================================================

  const handleAddAppointment = () => {
    if (
      !newAppointment.patient ||
      !newAppointment.doctor ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      alert("Please fill all fields");

      return;
    }

    const appointment = {
      id: Date.now(),
      ...newAppointment,
    };

    setAppointments((prev) => [appointment, ...prev]);

    setNewAppointment({
      patient: "",
      doctor: "",
      date: "",
      time: "",
      status: "Pending",
    });

    setOpenAddModal(false);
  };

  // ======================================================
  // JSX
  // ======================================================

  return (
    <div className="min-h-screen bg-[#f4f7fc] p-4 md:p-8">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Appointment Dashboard
          </h1>

          <p className="text-gray-500 mt-1">Manage appointments dynamically</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          {/* SEARCH */}

          <div className="flex items-center bg-white px-4 py-3 rounded-2xl shadow-sm w-full sm:w-80">
            <FaSearch className="text-gray-400 mr-3" />

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setCurrentPage(1);
              }}
              className="outline-none bg-transparent w-full text-sm"
            />
          </div>

          {/* FILTER */}

          <div className="flex items-center bg-white px-4 py-3 rounded-2xl shadow-sm">
            <FaFilter className="text-gray-400 mr-3" />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);

                setCurrentPage(1);
              }}
              className="outline-none bg-transparent text-sm"
            >
              <option value="All">All</option>

              <option value="Pending">Pending</option>

              <option value="Completed">Completed</option>

              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* ADD BUTTON */}

          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
          >
            <FaPlus />
            Add Appointment
          </button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* STATS */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {item.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${item.color}`}
            >
              <FaCalendarAlt />
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================== */}
      {/* CHART */}
      {/* ====================================================== */}

      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm mb-8">
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-xl text-gray-800">
              Weekly Appointment Review
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Real-time appointment analytics
            </p>
          </div>

          {/* STATS */}

          <div className="flex flex-wrap gap-3">
            <StatBadge label="Total" value={appointments.length} color="blue" />

            <StatBadge
              label="Completed"
              value={
                appointments.filter((a) => a.status === "Completed").length
              }
              color="green"
            />

            <StatBadge
              label="Cancelled"
              value={
                appointments.filter((a) => a.status === "Cancelled").length
              }
              color="red"
            />
          </div>
        </div>

        {/* CHART */}

        <div className="h-[320px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />

              {/* TOTAL */}

              <Bar
                dataKey="appointments"
                radius={[10, 10, 0, 0]}
                fill="#3B82F6"
              />

              {/* COMPLETED */}

              <Bar dataKey="completed" radius={[10, 10, 0, 0]} fill="#10B981" />

              {/* CANCELLED */}

              <Bar dataKey="cancelled" radius={[10, 10, 0, 0]} fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* ====================================================== */}
      {/* MOBILE CARDS */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {currentItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{item.patient}</h3>

                <p className="text-sm text-gray-500 mt-1">{item.doctor}</p>
              </div>

              <StatusBadge status={item.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <Info label="Date" value={item.date} />

              <Info label="Time" value={item.time} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5">
              {/* VIEW */}

              <button
                onClick={() => {
                  setSelectedAppointment(item);

                  setOpenViewModal(true);
                }}
                className="bg-blue-100 text-blue-600 py-2 rounded-xl text-sm"
              >
                View
              </button>

              {/* EDIT */}

              <button
                onClick={() => handleEditClick(item)}
                className="bg-green-100 text-green-600 py-2 rounded-xl text-sm"
              >
                Edit
              </button>

              {/* DELETE */}

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-100 text-red-600 py-2 rounded-xl text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================== */}
      {/* DESKTOP TABLE */}
      {/* ====================================================== */}

      <div className="hidden lg:block bg-white p-6 rounded-3xl shadow-sm mt-8 overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="text-left px-4 py-4 rounded-l-2xl">Patient</th>

              <th className="text-left">Doctor</th>

              <th className="text-left">Date</th>

              <th className="text-left">Time</th>

              <th className="text-left">Status</th>

              <th className="text-center rounded-r-2xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No appointments found.
                </td>
              </tr>
            )}
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* PATIENT */}

                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                      {item.patient.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.patient}
                      </p>

                      <p className="text-xs text-gray-400">#{item.id}</p>
                    </div>
                  </div>
                </td>

                {/* DOCTOR */}

                <td className="text-gray-700">{item.doctor}</td>

                {/* DATE */}

                <td className="text-gray-600">{item.date}</td>

                {/* TIME */}

                <td className="text-gray-600">{item.time}</td>

                {/* STATUS */}

                <td>
                  <StatusBadge status={item.status} />
                </td>

                {/* ACTIONS */}

                <td>
                  <div className="flex justify-center gap-3">
                    {/* VIEW */}

                    <button
                      onClick={() => {
                        setSelectedAppointment(item);

                        setOpenViewModal(true);
                      }}
                      className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center"
                    >
                      <FaEye />
                    </button>

                    {/* COMPLETE */}

                    <button
                      onClick={() => handleEditClick(item)}
                      className="w-9 h-9 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center"
                    >
                      <FaEdit />
                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          {/* PREV */}

          <button
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronLeft />
            Previous
          </button>

          {/* PAGES */}

          <div className="flex gap-2 flex-wrap justify-center">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-xl transition ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* NEXT */}

          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* VIEW MODAL */}
      {/* ====================================================== */}

      {openViewModal && selectedAppointment && (
        <ModalWrapper>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Appointment Details</h2>

            <button onClick={() => setOpenViewModal(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            <Info label="Patient" value={selectedAppointment.patient} />

            <Info label="Doctor" value={selectedAppointment.doctor} />

            <Info label="Date" value={selectedAppointment.date} />

            <Info label="Time" value={selectedAppointment.time} />

            <Info label="Status" value={selectedAppointment.status} />
          </div>
        </ModalWrapper>
      )}

      {/* ====================================================== */}
      {/* ADD MODAL */}
      {/* ====================================================== */}

      {/* ====================================================== */}
      {/* ADD MODAL */}
      {/* ====================================================== */}

      {openAddModal && (
        <ModalWrapper>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add Appointment</h2>

            <button onClick={() => setOpenAddModal(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            {/* PATIENT */}

            <input
              type="text"
              placeholder="Patient Name"
              value={newAppointment.patient}
              onChange={(e) =>
                setNewAppointment({
                  ...newAppointment,
                  patient: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* DOCTOR */}

            <input
              type="text"
              placeholder="Doctor Name"
              value={newAppointment.doctor}
              onChange={(e) =>
                setNewAppointment({
                  ...newAppointment,
                  doctor: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* DATE */}

            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) =>
                setNewAppointment({
                  ...newAppointment,
                  date: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* TIME */}

            <input
              type="text"
              placeholder="12:00 PM"
              value={newAppointment.time}
              onChange={(e) =>
                setNewAppointment({
                  ...newAppointment,
                  time: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* STATUS */}

            <select
              value={newAppointment.status}
              onChange={(e) =>
                setNewAppointment({
                  ...newAppointment,
                  status: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>

              <option value="Completed">Completed</option>

              <option value="Cancelled">Cancelled</option>
            </select>

            {/* BUTTON */}

            <button
              onClick={handleAddAppointment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Add Appointment
            </button>
          </div>
        </ModalWrapper>
      )}
      {/* ====================================================== */}
      {/* EDIT MODAL */}
      {/* ====================================================== */}

      {openEditModal && editAppointment && (
        <ModalWrapper>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Appointment</h2>

            <button onClick={() => setOpenEditModal(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            {/* PATIENT */}

            <input
              type="text"
              value={editAppointment.patient}
              onChange={(e) =>
                setEditAppointment({
                  ...editAppointment,
                  patient: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none"
              placeholder="Patient Name"
            />

            {/* DOCTOR */}

            <input
              type="text"
              value={editAppointment.doctor}
              onChange={(e) =>
                setEditAppointment({
                  ...editAppointment,
                  doctor: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none"
              placeholder="Doctor Name"
            />

            {/* DATE */}

            <input
              type="date"
              value={editAppointment.date}
              onChange={(e) =>
                setEditAppointment({
                  ...editAppointment,
                  date: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />

            {/* TIME */}

            <input
              type="text"
              value={editAppointment.time}
              onChange={(e) =>
                setEditAppointment({
                  ...editAppointment,
                  time: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none"
              placeholder="Time"
            />

            {/* STATUS */}

            <select
              value={editAppointment.status}
              onChange={(e) =>
                setEditAppointment({
                  ...editAppointment,
                  status: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="Pending">Pending</option>

              <option value="Completed">Completed</option>

              <option value="Cancelled">Cancelled</option>
            </select>

            {/* UPDATE BUTTON */}

            <button
              onClick={handleUpdateAppointment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Update Appointment
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

// ======================================================
// STATUS BADGE
// ======================================================

const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",

    Completed: "bg-green-100 text-green-700",

    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
};

// ======================================================
// INFO
// ======================================================

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>

    <p className="font-medium text-gray-700 mt-1">{value}</p>
  </div>
);

// ======================================================
// MODAL WRAPPER
// ======================================================

const ModalWrapper = ({ children }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
      {children}
    </div>
  </div>
);

export default AppointmentPage;
