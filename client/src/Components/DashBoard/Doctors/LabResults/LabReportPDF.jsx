import React from "react";

const LabReportPDF = ({
  report,
  results,
  doctorNote,
}) => {

  return (
    <div
      id="lab-report-pdf"
      className="bg-white text-black w-full max-w-[210mm] mx-auto p-8"
      style={{
        minHeight: "297mm",
        fontFamily: "Arial, sans-serif",
      }}
    >

      {/* ====================================================== */}
      {/* HOSPITAL HEADER */}
      {/* ====================================================== */}

      <div className="border-b-2 border-gray-300 pb-6 mb-6">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-3xl font-bold #1D4ED8">
              CityCare Hospital
            </h1>

            <p className="text-gray-600 mt-2">
              Ahmedabad, Gujarat
            </p>

            <p className="text-gray-600">
              +91 9876543210
            </p>

            <p className="text-gray-600">
              citycarehospital@gmail.com
            </p>
          </div>

          <div className="text-right">

            <h2 className="text-3xl font-bold text-gray-800 uppercase">
              Lab Report
            </h2>

            <p className="text-sm text-gray-500 mt-3">
              Report ID: {report.id}
            </p>

            <p className="text-sm text-gray-500">
              Date: {report.reportDate}
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* PATIENT DETAILS */}
      {/* ====================================================== */}

      <div className="grid grid-cols-2 gap-8 border-b border-gray-300 pb-6 mb-8 text-sm">

        <div className="space-y-3">

          <p>
            <span className="font-semibold">
              Patient Name:
            </span>{" "}
            {report.patientName}
          </p>

          <p>
            <span className="font-semibold">
              Patient ID:
            </span>{" "}
            {report.patientId}
          </p>

          <p>
            <span className="font-semibold">
              Age / Gender:
            </span>{" "}
            {report.age} / {report.gender}
          </p>

          <p>
            <span className="font-semibold">
              Phone:
            </span>{" "}
            {report.phone}
          </p>
        </div>

        <div className="space-y-3">

          <p>
            <span className="font-semibold">
              Doctor:
            </span>{" "}
            {report.doctor}
          </p>

          <p>
            <span className="font-semibold">
              Department:
            </span>{" "}
            {report.department}
          </p>

          <p>
            <span className="font-semibold">
              Test Name:
            </span>{" "}
            {report.testName}
          </p>

          <p>
            <span className="font-semibold">
              Technician:
            </span>{" "}
            {report.technician}
          </p>
        </div>
      </div>

      {/* ====================================================== */}
      {/* REPORT STATUS */}
      {/* ====================================================== */}

      <div className="mb-8">

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            report.status === "Completed"
              ? "bg-green-100 text-green-700"
              : report.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 #1D4ED8"
          }`}
        >
          {report.status}
        </span>
      </div>

      {/* ====================================================== */}
      {/* TEST RESULTS */}
      {/* ====================================================== */}

      <div className="mb-10">

        <h3 className="text-xl font-bold mb-4">
          Test Results
        </h3>

        <table className="w-full border border-gray-300 text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="border px-4 py-3 text-left">
                Test
              </th>

              <th className="border px-4 py-3 text-left">
                Result
              </th>

              <th className="border px-4 py-3 text-left">
                Normal Range
              </th>

              <th className="border px-4 py-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {results.map((item, index) => (

              <tr key={index}>

                <td className="border px-4 py-3">
                  {item.test}
                </td>

                <td className="border px-4 py-3">
                  {item.result}
                </td>

                <td className="border px-4 py-3">
                  {item.range}
                </td>

                <td className="border px-4 py-3 font-semibold">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====================================================== */}
      {/* TECHNICIAN NOTE */}
      {/* ====================================================== */}

      <div className="mb-8">

        <h3 className="text-lg font-bold mb-3">
          Technician Note
        </h3>

        <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-700">
          {report.technicianNote}
        </div>
      </div>

      {/* ====================================================== */}
      {/* DOCTOR NOTE */}
      {/* ====================================================== */}

      <div className="mb-12">

        <h3 className="text-lg font-bold mb-3">
          Doctor Note
        </h3>

        <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-700">
          {doctorNote}
        </div>
      </div>

      {/* ====================================================== */}
      {/* SIGNATURES */}
      {/* ====================================================== */}

      <div className="grid grid-cols-2 gap-10 mt-20 text-sm">

        <div>

          <p className="font-semibold mb-14">
            Technician Signature
          </p>

          <div className="border-t pt-2">
            {report.technician}
          </div>
        </div>

        <div>

          <p className="font-semibold mb-14">
            Doctor Signature
          </p>

          <div className="border-t pt-2">
            {report.doctor}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReportPDF;