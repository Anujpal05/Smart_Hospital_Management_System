import React, { useState } from "react";
import {
  FiX,
  FiUpload,
  FiPlus,
  FiTrash2,
  FiUser,
  FiPhone,
  FiCalendar
} from "react-icons/fi";
import React from "react";

export default function AddPatientForm({ open, setOpen }) {
  const [documents, setDocuments] = useState([
    { label: "", file: null }
  ]);

  const addDocument = () => {
    setDocuments([...documents, { label: "", file: null }]);
  };

  const removeDocument = (index) => {
    const newDocs = [...documents];
    newDocs.splice(index, 1);
    setDocuments(newDocs);
  };

  const handleLabelChange = (index, value) => {
    const newDocs = [...documents];
    newDocs[index].label = value;
    setDocuments(newDocs);
  };

  const handleFileChange = (index, file) => {
    const newDocs = [...documents];
    newDocs[index].file = file;
    setDocuments(newDocs);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white w-[720px] rounded-xl shadow-xl p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Register New Patient
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-2 gap-4">

          {/* FULL NAME */}
          <div>
            <label className="label">Full Name</label>
            <div className="inputWrap">
              <FiUser className="icon"/>
              <input
                placeholder="e.g., Emily Chen"
                className="inputField"
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="label">Phone Number</label>
            <div className="inputWrap">
              <FiPhone className="icon"/>
              <input
                placeholder="e.g., (555) 123-4567"
                className="inputField"
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="label">Date of Birth</label>
            <div className="inputWrap">
              <FiCalendar className="icon"/>
              <input type="date" className="inputField"/>
            </div>
          </div>

          {/* GENDER */}
          <div>
            <label className="label">Gender</label>
            <select className="input">
              <option>Select: Male, Female, Other</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

        </div>

        {/* MEDICAL INFO */}
        <div className="mt-6">

          <h3 className="font-medium mb-3">
            Medical Information
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="label">Weight (kg)</label>
              <input className="input" placeholder="e.g. 65"/>
            </div>

            <div>
              <label className="label">Height (cm)</label>
              <input className="input" placeholder="e.g. 168"/>
            </div>

          </div>

          <div className="mt-4">
            <label className="label">Primary Complaint</label>
            <input
              className="input"
              placeholder="e.g. Cold"
            />
          </div>

        </div>

        {/* DOCUMENT UPLOAD */}
        <div className="mt-6">

          <h3 className="font-medium mb-3">
            Upload Documents
          </h3>

          {documents.map((doc, index) => (

            <div
              key={index}
              className="flex items-center gap-3 mb-3"
            >

              {/* LABEL */}
              <input
                type="text"
                placeholder="Document label (e.g. Prescription)"
                className="input flex-1"
                value={doc.label}
                onChange={(e) =>
                  handleLabelChange(index, e.target.value)
                }
              />

              {/* FILE */}
              <label className="uploadBtn">
                <FiUpload />
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleFileChange(index, e.target.files[0])
                  }
                />
              </label>

              {/* REMOVE */}
              {documents.length > 1 && (
                <button
                  onClick={() => removeDocument(index)}
                  className="text-red-500"
                >
                  <FiTrash2 />
                </button>
              )}

            </div>
          ))}

          {/* ADD DOCUMENT */}
          <button
            onClick={addDocument}
            className="flex items-center gap-1 text-blue-600 text-sm mt-2"
          >
            <FiPlus />
            Add Document
          </button>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="px-6 py-2 rounded-full border"
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 rounded-full bg-blue-600 text-white"
          >
            Register Patient
          </button>

        </div>

      </div>

    </div>
  );
}