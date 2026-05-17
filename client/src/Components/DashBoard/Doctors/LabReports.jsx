import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiActivity,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";

const LabReports = () => {
  const [reportId, setReportId] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [reports, setReports] = useState([
    {
      id: 1,
      rid: "LBR-102458",
      name: "Jane Davise",
      test: "ECG",
      department: "Cardiology",
      doctor: "Dr. Martin",
      date: "2025-02-12",
      status: "Completed",
    },

    {
      id: 2,
      rid: "LBR-102457",
      name: "Mark Lee",
      test: "MRI Scan",
      department: "Radiology",
      doctor: "Dr. Robert",
      date: "2025-02-12",
      status: "Completed",
    },

    {
      id: 3,
      rid: "LBR-102456",
      name: "Sarah Johnson",
      test: "Urine Test",
      department: "Pathology",
      doctor: "Dr. Smith",
      date: "2025-02-11",
      status: "Pending",
    },

    {
      id: 4,
      rid: "LBR-102455",
      name: "Alexa Roy",
      test: "Blood Test",
      department: "Hematology",
      doctor: "Dr. Patel",
      date: "2025-02-10",
      status: "In Progress",
    },
  ]);

  const itemsPerPage = 5;

  const stats = useMemo(
    () => [
      {
        title: "Total Lab Tests",
        value: reports.length,
        icon: <FiFileText />,
      },

      {
        title: "Pending Reports",
        value: reports.filter((r) => r.status === "Pending").length,
        icon: <FiClock />,
      },

      {
        title: "Completed Reports",
        value: reports.filter((r) => r.status === "Completed").length,
        icon: <FiCheckCircle />,
      },

      {
        title: "Tests In Progress",
        value: reports.filter((r) => r.status === "In Progress").length,
        icon: <FiActivity />,
      },
    ],
    [reports],
  );

  const filteredReports = useMemo(() => {
    let filtered = reports.filter((report) =>
      `${report.rid} ${report.name} ${report.test}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

    if (statusFilter !== "All") {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    return filtered;
  }, [reports, search, statusFilter]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const currentItems = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const navigate = useNavigate();
  return (
    <div className="p-4 sm:p-6">
      {" "}
      {/* ===== TOP STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
      {/* ===== CHART + DEPARTMENT ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-4">Monthly Test Volume</h3>

          <div className="h-60">
            <LabTestChart reports={reports} />{" "}
          </div>
        </div>

        {/* Department */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-4">Test Volume by Department</h3>

          {useMemo(() => {
            const departments = {};

            reports.forEach((report) => {
              if (!departments[report.department]) {
                departments[report.department] = 0;
              }

              departments[report.department] += 1;
            });

            return Object.entries(departments).map(([name, value]) => (
              <DeptRow key={name} name={name} value={value} />
            ));
          }, [reports])}
        </div>
      </div>
      {/* ===== TABLE ===== */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Lab Report List</h3>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* SEARCH */}

            <div className="relative w-full sm:w-72">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />

              <input
                placeholder="Search Report..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  setCurrentPage(1);
                }}
                className="pl-9 pr-3 py-2 border rounded-lg text-sm outline-none w-full"
              />
            </div>

            {/* FILTER */}

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);

                setCurrentPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="All">All</option>

              <option value="Completed">Completed</option>

              <option value="Pending">Pending</option>

              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <table className="hidden lg:table w-full text-sm">
          {" "}
          <thead className="text-gray-400 text-xs uppercase border-b">
            <tr>
              <th className="text-left py-3">#</th>
              <th className="text-left py-3">Report ID</th>
              <th className="text-left py-3">Patient Name</th>
              <th className="text-left py-3">Test</th>
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  No reports found.
                </td>
              </tr>
            )}
            {currentItems.map((report) => (
              <TableRow
                key={report.id}
                {...report}
                setReportId={setReportId}
                navigate={navigate}
              />
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:hidden mt-6">
          {currentItems.map((report) => (
            <div key={report.id} className="bg-gray-50 rounded-2xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{report.name}</h3>

                  <p className="text-sm text-gray-500 mt-1">{report.test}</p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-lg ${
                    report.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : report.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                <Info label="Report ID" value={report.rid} />

                <Info label="Date" value={report.date} />
              </div>

              <button
                onClick={() => {
                  setReportId(report.rid);

                  navigate(`/doctor/lab-reports/${report.rid}`);
                }}
                className="w-full mt-5 bg-blue-100 text-blue-600 py-3 rounded-xl"
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function DeptRow({ name, value }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
          <FiActivity />
        </div>

        <span className="font-medium text-gray-700">{name}</span>
      </div>

      <span className="font-semibold">{value}</span>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-[#eef2ff] p-6 rounded-2xl flex items-center justify-between hover:shadow-md transition-all duration-300">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>

      <div className="w-12 h-12 rounded-full border-4 border-blue-600 flex items-center justify-center text-blue-600">
        {icon}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>

      <p className="font-medium text-gray-700 mt-1">{value}</p>
    </div>
  );
}

function TableRow({
  id,
  rid,
  name,
  test,
  date,
  status,
  setReportId,
  navigate,
}) {
  const statusColor =
    status === "Completed"
      ? "bg-green-100 text-green-600"
      : status === "Pending"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-blue-100 text-blue-600";

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3">{id}</td>

      <td className="py-3 font-medium">{rid}</td>

      <td className="py-3 font-semibold">{name}</td>

      <td className="py-3 text-gray-600">{test}</td>

      <td className="py-3 text-gray-600">{date}</td>

      <td className="py-3">
        <span className={`px-3 py-1 text-xs rounded-lg ${statusColor}`}>
          {status}
        </span>
      </td>

      <td className="py-3 flex items-center gap-2">
        <button
          onClick={() => {
            setReportId(rid);
            navigate(`/doctor/lab-reports/${rid}`);
          }}
          className="bg-blue-100 text-blue-600 cursor-pointer  px-3 py-1 rounded-lg text-xs"
        >
          View
        </button>

        {/* <FiMoreVertical className="text-gray-400 cursor-pointer" /> */}
      </td>
    </tr>
  );
}

const LabTestChart = ({ reports }) => {
  const data = React.useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // initialize monthly counts
    const monthlyData = months.map((month) => ({
      month,
      tests: 0,
    }));

    // count reports dynamically
    reports.forEach((report) => {
      if (!report.date) return;

      const date = new Date(report.date);

      const monthIndex = date.getMonth();

      monthlyData[monthIndex].tests += 1;
    });

    return monthlyData;
  }, [reports]);
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="tests"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LabReports;
