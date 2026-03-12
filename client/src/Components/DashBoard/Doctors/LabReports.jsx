import React, { useState } from "react";
import {
  FiSearch,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiActivity,
  FiMoreVertical
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import LabReportView from "./LabResults/LabReportFull";
import { useNavigate } from "react-router-dom";

const LabReports = () => {
  const [reportId , setReportId]=useState(false)
  const navigate = useNavigate();
  return (
   <div className="p-6">
          {/* ===== TOP STATS ===== */}
          <div className="grid grid-cols-4 gap-6">

            <StatCard
              icon={<FiFileText />}
              title="Total Lab Tests"
              value="1245"
            />

            <StatCard
              icon={<FiClock />}
              title="Pending Reports"
              value="120"
            />

            <StatCard
              icon={<FiCheckCircle />}
              title="Completed Reports"
              value="1100"
            />

            <StatCard
              icon={<FiActivity />}
              title="Tests In Progress"
              value="25"
            />

          </div>


          {/* ===== CHART + DEPARTMENT ===== */}
          <div className="grid grid-cols-3 gap-6 mt-8">

            {/* Chart */}
            <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md">

              <h3 className="font-semibold mb-4">
                Monthly Test Volume
              </h3>

              <div className="h-60 flex items-center justify-center text-gray-400">
          <LabTestChart />
              </div>

            </div>


            {/* Department */}
            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h3 className="font-semibold mb-4">
                Test Volume by Department
              </h3>

              <DeptRow name="Cardiology" value="86" />
              <DeptRow name="Hematology" value="512" />
              <DeptRow name="Radiology" value="289" />
              <DeptRow name="Pathology" value="205" />

            </div>

          </div>


          {/* ===== TABLE ===== */}
          <div className="bg-white p-6 rounded-2xl shadow-md mt-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

              <h3 className="font-semibold">
                Lab Report List
              </h3>

              <div className="relative">
                <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm"/>
                <input
                  placeholder="Search Report..."
                  className="pl-9 pr-3 py-2 border rounded-lg text-sm outline-none"
                />
              </div>

            </div>


            {/* TABLE */}
            <table className="w-full text-sm">

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

                <TableRow
                  id="1"
                  rid="LBR-102458"
                  name="Jane Davise"
                  test="ECG"
                  date="2025-02-12"
                  status="Completed"
                  setReportId={setReportId}
                  navigate={navigate}
                />

                <TableRow
                  id="2"
                  rid="LBR-102457"
                  name="Mark Lee"
                  test="MRI Scan"
                  date="2025-02-12"
                  status="Completed"
                  setReportId={setReportId}
                   navigate={navigate}
                />

                <TableRow
                  id="3"
                  rid="LBR-102456"
                  name="Sarah Johnson"
                  test="Urine Test"
                  date="2025-02-11"
                  status="Pending"
                  setReportId={setReportId}
                   navigate={navigate}
                />

              </tbody>

            </table>

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

        <span className="font-medium text-gray-700">
          {name}
        </span>

      </div>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-[#eef2ff] p-6 rounded-2xl flex items-center justify-between">

      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </h2>
      </div>

      <div className="w-12 h-12 rounded-full border-4 border-blue-600 flex items-center justify-center text-blue-600">
        {icon}
      </div>

    </div>
  );
}

function TableRow({ id, rid, name, test, date, status ,setReportId ,navigate}) {

  const statusColor =
    status === "Completed"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";

  return (
    <tr className="hover:bg-gray-50">

      <td className="py-3">{id}</td>

      <td className="py-3 font-medium">
        {rid}
      </td>

      <td className="py-3 font-semibold">
        {name}
      </td>

      <td className="py-3 text-gray-600">
        {test}
      </td>

      <td className="py-3 text-gray-600">
        {date}
      </td>

      <td className="py-3">
        <span className={`px-3 py-1 text-xs rounded-lg ${statusColor}`}>
          {status}
        </span>
      </td>

      <td className="py-3 flex items-center gap-2">

        <button onClick={()=>{
          setReportId(rid);
          navigate(`/doctor/lab-reports/${rid}`)

        }

        } className="bg-blue-100 text-blue-600 cursor-pointer  px-3 py-1 rounded-lg text-xs">
          View
        </button>

        {/* <FiMoreVertical className="text-gray-400 cursor-pointer" /> */}

      </td>

    </tr>
  );
}

const LabTestChart = () => {
	const data = [
  { month: "Jan", tests: 120 },
  { month: "Feb", tests: 210 },
  { month: "Mar", tests: 170 },
  { month: "Apr", tests: 260 },
  { month: "May", tests: 300 },
  { month: "Jun", tests: 280 },
  { month: "Jul", tests: 350 },
  { month: "Aug", tests: 390 },
  { month: "Sep", tests: 420 },
  { month: "Oct", tests: 460 },
  { month: "Nov", tests: 430 },
  { month: "Dec", tests: 500 }
];
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