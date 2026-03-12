import { UserPlus, Calendar, FlaskConical, FileText } from "lucide-react";
import React, { useState } from "react";
import LabReports from "./LabReports";
import Modal from "../Common/Modal";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {

  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add New Patient",
      icon: <UserPlus size={18} />,
      button: "Add",
      modal: "patient"
    },
    {
      title: "Schedule Appointment",
      icon: <Calendar size={18} />,
      button: "Add",
      modal: "appointment"
    },
    {
      title: "View Lab Results",
      icon: <FlaskConical size={18} />,
      button: "View",
      modal: "Lab Report"
    },
    {
      title: "General Reports",
      icon: <FileText size={18} />,
      button: "Add",
      modal: "reports"
    },
  ];

  const renderModalContent = () => {
    switch (modalType) {
      case "patient":
        return <>add patient</>;
      case "appointment":
        return <>appoint manetform</>;
      case "reports":
        return <div>reports</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full">

      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >

            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-2 rounded-md">
                {action.icon}
              </div>

              <span className="text-gray-700 font-medium">
                {action.title}
              </span>
            </div>

            <button
              onClick={
                action.modal == "reports" ? ()=> {navigate("/doctor/generate-reports")} : 
                 action.modal == "Lab Report" ? ()=> {navigate("/doctor/lab-reports")} :
                 action.modal == "patient" ? ()=> {navigate("/doctor/add-new-patient")} :
                 action.modal == "appointment" ? ()=> {navigate("/doctor/schedule-appointment")} :
                ()=>{}
              }
              className="px-4 py-1 cursor-pointer text-sm rounded-full border text-gray-600 hover:bg-gray-200 transition"
            >
              {action.button}
            </button>

          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
      >
        {renderModalContent()}
      </Modal>

    </div>
  );
}