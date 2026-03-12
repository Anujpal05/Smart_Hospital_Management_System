import React, { useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaStethoscope,
  FaHospital,
  FaDownload,
  FaPrint,
  FaArrowLeft,
  FaStar,
  FaFileMedical,
  FaSave
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  ReferenceLine,
  ReferenceDot,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart
} from "recharts";
import { TextAreaField } from "../../Patient/InputField";

const sparkData = [
  { index: 1, value: 60 },
  { index: 2, value: 70 },
  { index: 3, value: 65 },
  { index: 4, value: 75 },
  { index: 5, value: 80 },
];
const results = [
  {
    test: "Heart Rate",
    result: "76 bpm",
    range: "60-100 bpm",
    status: "Normal",
  },
  {
    test: "PR Interval",
    result: "160 ms",
    range: "120-200",
    status: "Normal",
  },
  {
    test: "QRS Duration",
    result: "95 ms",
    range: "80-120",
    status: "Normal",
  },
  {
    test: "QT Interval",
    result: "400 ms",
    range: "350-440",
    status: "Normal",
  },
  {
    test: "ST Segment",
    result: "-0.1 mm",
    range: "-0.5 to 1",
    status: "Normal",
  },
  {
    test: "T Wave",
    result: "Upright",
    range: "Positive",
    status: "Positive",
  },
  {
    test: "Arrhythmia",
    result: "No",
    range: "Negative",
    status: "Negative",
  },
];
const note = "Recommend further cardiac evaluation and monitoring of the patient's heart rate over the next 24 hours."


const LabReportView = () => {
  const navigator = useNavigate()
  const [doctorNote ,setDoctorNote] = useState(note)
  const [isNote , setIsNote] = useState(false);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Lab Report <span className="text-gray-500">| LBR-102458</span>
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="col-span-1 space-y-6">

          {/* PATIENT CARD */}
          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="font-semibold mb-4 text-gray-700">
              Patient Information
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Jane Davise</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">

              <p className="flex justify-between">
                <span className="text-gray-500">Patient ID</span>
                PT-10245
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Age / Gender</span>
                32 / Female
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  <FaPhoneAlt /> Phone
                </span>
                +91 9876543210
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  <FaStethoscope /> Doctor
                </span>
                Dr. John Smith
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  <FaHospital /> Department
                </span>
                Cardiology
              </p>

            </div>
          </div>

          {/* NOTES */}
          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="font-semibold mb-3">Test Results</h2>

            <div className="bg-yellow-50 p-3 rounded mb-3 text-sm">
              <p className="font-medium mb-3">Lab Technician Notes:</p>
              <p className="text-gray-600">
                Patient shows mild irregularity in ECG pattern.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                John Carter
              </p>
            </div>

            <div className="bg-gray-100 p-3 rounded text-sm">
              <p className="font-medium mb-3">Doctor Notes:</p>
                      { isNote ? <textarea
                        autoFocus ={isNote}
                        value={doctorNote}
                        onChange={(e) => setDoctorNote(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-500 min-h-[100px] text-sm font-medium text-slate-700"
                      /> : 
                    <p className="text-gray-600">
                      {doctorNote}
                    </p>  }
              <p className="text-xs border-t-2 pt-3  text-gray-500 mt-6">
                Dr. John Smith
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-2 space-y-6">

          {/* REPORT INFO */}
          <div className="bg-white rounded-xl shadow p-5 grid grid-cols-2 gap-4">

            <div>
              <p className="text-gray-500 text-sm">Patient ID</p>
              <p className="font-medium">LBR-102458</p>
            </div>

            <div className="text-right">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                Completed
              </span>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Test Name</p>
              <p>ECG</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Report Date</p>
              <p>12 Feb 2025</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Report ID</p>
              <p>LB2-1134</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Lab Technician</p>
              <p>John Carter</p>
            </div>

          </div>

          {/* TEST RESULTS TABLE */}
          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="font-semibold mb-4">Test Results</h2>

            <table className="w-full text-sm">

              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left py-2">Test</th>
                  <th className="text-left py-2">Result</th>
                  <th className="text-left py-2">Normal Range</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>

              <tbody>

                {results.map((item, index) => (
                  <tr key={index} className="border-b">

                    <td className="py-3">{item.test}</td>

                    <td>{item.result}</td>

                    <td>{item.range}</td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded text-xs
                        ${item.status === "Normal"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* ACTION BUTTONS */}

          <div className="flex justify-between">

            <div className="flex gap-3">

              <button className="bg-blue-600  cursor-pointer  text-white px-4 py-2 rounded flex items-center gap-2">
                <FaDownload /> Download PDF
              </button>

              <button className="border cursor-pointer  px-4 py-2 rounded flex items-center gap-2">
                <FaPrint /> Print Report
              </button>

             {!isNote ?  <button onClick={()=> {console.log(isNote);setIsNote(true)}} className="border  cursor-pointer px-4 py-2 rounded flex items-center gap-2">
                <FaFileMedical /> Add Note
              </button> :
              <button onClick={()=> {console.log(isNote);setIsNote(false)}} className="border  cursor-pointer px-4 py-2 rounded flex items-center gap-2">
                <FaSave /> Save Note
              </button>}  

            </div>

            <div className="flex gap-3">

              <button onClick={()=>navigator(-1)} className=" cursor-pointerborder px-4 py-2 rounded flex items-center gap-2">
                <FaArrowLeft /> Back
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LabReportView;