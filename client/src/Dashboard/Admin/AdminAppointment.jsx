import React, { useState } from "react";

const appointments = [
	{ _id: "1", userName: "Anuj Ali Mazari", patientId: "P123", doctorName: "Dr. Sharma", timeSlot: "10:00 AM", status: "PENDING", reason: "", },
  {
    _id: "2",
    userName: "Anuj Pal",
    patientId: "P124",
    doctorName: "Dr. Mehta",
    timeSlot: "11:00 AM",
    status: "CONFIRMED",
    reason: "",
  },
  {
    _id: "3",
    userName: "Rahul Verma",
    patientId: "P125",
    doctorName: "Dr. Patel",
    timeSlot: "12:30 PM",
    status: "PENDING",
    reason: "",
  },
  {
    _id: "4",
    userName: "Sneha Shah",
    patientId: "P126",
    doctorName: "Dr. Iyer",
    timeSlot: "02:00 PM",
    status: "CANCELLED",
    reason: "Doctor unavailable",
  },
  {
    _id: "5",
    userName: "Amit Kumar",
    patientId: "P127",
    doctorName: "Dr. Singh",
    timeSlot: "03:15 PM",
    status: "COMPLETED",
    reason: "",
  },
  {
    _id: "6",
    userName: "Priya Desai",
    patientId: "P128",
    doctorName: "Dr. Mehta",
    timeSlot: "04:00 PM",
    status: "PENDING",
    reason: "",
  },
  {
    _id: "7",
    userName: "Karan Joshi",
    patientId: "P129",
    doctorName: "Dr. Patel",
    timeSlot: "09:30 AM",
    status: "CONFIRMED",
    reason: "",
  },
  {
    _id: "8",
    userName: "Neha Gupta",
    patientId: "P130",
    doctorName: "Dr. Sharma",
    timeSlot: "10:45 AM",
    status: "CANCELLED",
    reason: "Patient requested cancellation",
  },
  {
    _id: "9",
    userName: "Rohit Yadav",
    patientId: "P131",
    doctorName: "Dr. Iyer",
    timeSlot: "01:00 PM",
    status: "PENDING",
    reason: "",
  },
  {
    _id: "10",
    userName: "Pooja Agarwal",
    patientId: "P132",
    doctorName: "Dr. Singh",
    timeSlot: "02:45 PM",
    status: "COMPLETED",
    reason: "",
  },
  {
    _id: "11",
    userName: "Vikas Mishra",
    patientId: "P133",
    doctorName: "Dr. Mehta",
    timeSlot: "05:30 PM",
    status: "PENDING",
    reason: "",
  },
];


const AdminAppointment = () => {
  const [rejectReason, setRejectReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleAccept = (id) => {
    console.log("Accepted:", id);
    // dispatch(updateStatus({ id, status: "CONFIRMED" }))
  };

  const handleReject = (id) => {
    if (!rejectReason) return alert("Enter reason");

    console.log("Rejected:", id, rejectReason);
    // dispatch(updateStatus({ id, status: "CANCELLED", reason: rejectReason }))

    setRejectReason("");
    setSelectedId(null);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3">User</th>
              <th className="p-3">Patient ID</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reason</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{appt.userName}</td>
                <td className="p-3">{appt.patientId}</td>
                <td className="p-3">{appt.doctorName}</td>
                <td className="p-3">{appt.timeSlot}</td>

                {/* Status Badge */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appt.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : appt.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-500">
                  {appt.reason || "-"}
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleAccept(appt._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => setSelectedId(appt._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {selectedId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="font-semibold mb-2">Reject Reason</h3>

            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Enter reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedId(null)}
                className="px-3 py-1 text-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={() => handleReject(selectedId)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointment;