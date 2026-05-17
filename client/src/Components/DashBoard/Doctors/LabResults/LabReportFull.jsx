import React, { useMemo, useState } from "react";
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
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import LabReportPDF from "./LabReportPDF";

const sparkData = [
  { index: 1, value: 60 },
  { index: 2, value: 70 },
  { index: 3, value: 65 },
  { index: 4, value: 75 },
  { index: 5, value: 80 },
];
const INITIAL_RESULTS = [
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

const note =
  "Recommend further cardiac evaluation and monitoring of the patient's heart rate over the next 24 hours.";

const LabReportView = () => {
  const reportRef = useRef(null);

  const [results, setResults] = useState(INITIAL_RESULTS);

  const [search, setSearch] = useState("");

  const navigator = useNavigate();
  const [doctorNote, setDoctorNote] = useState(note);
  const [isDownloading, setIsDownloading] = useState(false);
  const [report, setReport] = useState({
    id: "LBR-102458",
    patientId: "PT-10245",
    patientName: "Jane Davise",
    age: 32,
    gender: "Female",
    phone: "+91 9876543210",
    doctor: "Dr. John Smith",
    department: "Cardiology",
    testName: "ECG",
    reportDate: "12 Feb 2025",
    technician: "John Carter",
    status: "Completed",
    technicianNote: "Patient shows mild irregularity in ECG pattern.",
  });

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const input = reportRef.current;

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!input) return;

      const clonedElement =
  input.cloneNode(true);

// remove all problematic styles
const allElements =
  clonedElement.querySelectorAll("*");

allElements.forEach((el) => {

  el.style.color =
    "#000000";

  el.style.backgroundColor =
    "#ffffff";

  el.style.borderColor =
    "#d1d5db";

  el.style.boxShadow =
    "none";
});

const canvas =
  await html2canvas(
    clonedElement,
    {
      scale:
        window.innerWidth < 768
          ? 1
          : 2,

      useCORS: true,

      backgroundColor:
        "#ffffff",

      logging: false,

      letterRendering: true,
    }
  );
  
      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;

      const pageHeight = 297;

      const imgWidth = pdfWidth;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;
      }

      pdf.save(`${report.patientName}_Lab_Report.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const filteredResults = useMemo(() => {
    return results.filter((item) =>
      item.test.toLowerCase().includes(search.toLowerCase()),
    );
  }, [results, search]);

  const handleNoteChange = React.useCallback((e) => {
    setDoctorNote(e.target.value);
  }, []);
  const [isNote, setIsNote] = useState(false);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Lab Report <span className="text-gray-500">| {report.id}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="xl:col-span-1 space-y-6">
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
                <p className="font-semibold">{report.patientName}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-500">Patient ID</span>
                {report.patientId}{" "}
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Age / Gender</span>
                {report.age} / {report.gender}{" "}
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  <FaPhoneAlt /> Phone
                </span>
                {report.phone}
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  <FaStethoscope /> Doctor
                </span>
                {report.doctor}
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  <FaHospital /> Department
                </span>
                {report.department}
              </p>
            </div>
          </div>

          {/* NOTES */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-3">Test Results</h2>

            <div className="bg-yellow-50 p-3 rounded mb-3 text-sm">
              <p className="font-medium mb-3">Lab Technician Notes:</p>
              <p className="text-gray-600">{report.technicianNote}</p>
              <p className="text-xs text-gray-500 mt-1">{report.technician}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded text-sm">
              <p className="font-medium mb-3">Doctor Notes:</p>
              {isNote ? (
                <textarea
                  autoFocus={isNote}
                  value={doctorNote}
                  onChange={handleNoteChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-500 min-h-[100px] text-sm font-medium text-slate-700"
                />
              ) : (
                <p className="text-gray-600">{doctorNote}</p>
              )}
              <p className="text-xs border-t-2 pt-3  text-gray-500 mt-6">
                {report.doctor}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="xl:col-span-2 space-y-6">
          {/* REPORT INFO */}
          <div className="bg-white rounded-xl shadow p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Patient ID</p>
              <p className="font-medium">{report.id}</p>
            </div>

            <div className="text-right">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                {report.status}
              </span>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Test Name</p>
              <p>{report.testName}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Report Date</p>
              <p>{report.reportDate}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Report ID</p>
              <p>LB2-1134</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Lab Technician</p>
              <p>{report.technician}</p>
            </div>
          </div>

          {/* TEST RESULTS TABLE */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-4">Test Results</h2>
            <input
              placeholder="Search test..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 w-full sm:w-72 px-4 py-2 border rounded-xl outline-none"
            />
            <div className="overflow-x-auto">
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
                  {filteredResults.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-10 text-gray-400"
                      >
                        No test results available.
                      </td>
                    </tr>
                  )}
                  {filteredResults.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{item.test}</td>

                      <td>{item.result}</td>

                      <td>{item.range}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded text-xs
                          ${
                            item.status === "Normal"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Positive"
                                ? "bg-blue-100 text-blue-700"
                                : item.status === "Negative"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
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
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {" "}
            <div className="grid grid-cols-2 sm:flex gap-3">
              <button
                disabled={isDownloading}
                onClick={handleDownload}
                className={`bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-all ${
                  isDownloading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isDownloading ? (
                  "Generating..."
                ) : (
                  <>
                    <FaDownload />
                    Download PDF
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="border cursor-pointer  px-4 py-2 rounded flex items-center gap-2"
              >
                <FaPrint /> Print Report
              </button>

              {!isNote ? (
                <button
                  onClick={() => {
                    console.log(isNote);
                    setIsNote(true);
                  }}
                  className="border  cursor-pointer px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaFileMedical /> Add Note
                </button>
              ) : (
                <button
                  onClick={() => {
                    console.log(isNote);
                    setIsNote(false);
                  }}
                  className="border  cursor-pointer px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaSave /> Save Note
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigator(-1)}
                className=" cursor-pointer border px-4 py-2 rounded flex items-center gap-2"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: "-99999px",
          width: "210mm",
          background: "#ffffff",
          zIndex: -1,
        }}
      >
        {" "}
        <div ref={reportRef}>
          <LabReportPDF
            report={report}
            results={filteredResults}
            doctorNote={doctorNote}
          />
        </div>
      </div>
    </div>
  );
};

export default LabReportView;
