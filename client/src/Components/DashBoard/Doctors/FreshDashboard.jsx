import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  InputField,
  SelectField,
  SectionHeader,
  TextAreaField,
} from "../../DashBoard/Patient/InputField";
import { INITIAL_APPOINTMENT } from "../../../Data/patientdata";
import { doctors, specializations ,doctorsindb} from "../../../Data/doctors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  ClipboardList,
  Stethoscope,
  FileText,
  Save,
  Trash2,
  ArrowRight,
  Camera,
  Hash,
  Clock,
  Activity,
  CreditCard,
  AlertCircle,
  UserCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { createAppointmentAction } from "../../../actions/doctorActions";
/**
 * INLINE SVG ICONS
 */
const IconCheckCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconCalendar = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
    />
    <line
      x1="16"
      y1="2"
      x2="16"
      y2="6"
    />
    <line
      x1="8"
      y1="2"
      x2="8"
      y2="6"
    />
    <line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
    />
  </svg>
);
const IconArrowRight = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
    />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconSearch = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle
      cx="11"
      cy="11"
      r="8"
    />
    <line
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
    />
  </svg>
);
const IconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
    />
    <line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
    />
  </svg>
);

/**
 * MODAL COMPONENT
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-gray-500"
          >
            <IconClose />
          </button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

/**
 * TOAST NOTIFICATION COMPONENT
 */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-600" : "bg-blue-600";

  return (
    <div
      className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] animate-in slide-in-from-right duration-300 flex items-center gap-3`}
    >
      {type === "success" && <IconCheckCircle />}
      <span className="font-medium">{message}</span>
    </div>
  );
};
const getNewDate = ()=>{
  return new Date().toISOString().split("T")[0]
}
/**
 * MAIN APP
 */
export default function FreshDashboard({ user }) {
  const [formData, setFormData] = useState({
    logistics: {
      specialization: "",
      doctor: "",
      date: "",
      time: "",
      place: "ONLINE",
      reason:"Normal Fivor",
      priority: "NORMAL",
    },
  });
  const [onboardingStep, setOnboardingStep] = useState(2);
  const [activeModal, setActiveModal] = useState(null); // 'profile', 'booking', 'search'
  const [notification, setNotification] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const notify = (msg, type = "info") => {
    setNotification({ msg, type });
  };

  const handleChange = (section, field, value) => {
  setFormData((prev) => {
    let updated = {
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    };

    // ✅ If specialization changes → reset doctor
    if (field === "specialization") {
      updated[section].doctor = "";
    }

    // ✅ If doctor changes → auto set specialization
    if (field === "doctor") {
      const selectedDoctor = doctors.find(
        (doc) => doc.name === value
      );

      if (selectedDoctor) {
        updated[section].specialization =
          selectedDoctor.specialization;
      }
    }

    return updated;
  });
};

  // Filter doctors based on specialization
  const filteredDoctors = doctors.filter((doc) => {
  // If specialization selected → filter by specialization
  if (formData.logistics.specialization) {
    return doc.specialization === formData.logistics.specialization;
  }

  // If doctor selected → show only that doctor
  if (formData.logistics.doctor) {
    return doc.name === formData.logistics.doctor;
  }

  return true;
});

  const handleBooking = async (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    setLoading(true);
    const response = await dispatch(createAppointmentAction(formData.logistics));
    // console.log("Booking Response:", response);
    setLoading(false);
    setActiveModal(null);
    
  };

  // const handleBooking = (e) => {
  //   e.preventDefault();
  //   const newAppointment = { id: Date.now(), title: "General Consultation" };
  //   setAppointments([...appointments, newAppointment]);
  //   setActiveModal(null);
  //   notify("Appointment booked! Check your calendar.", "success");
  // };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* ===== WELCOME BANNER ===== */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
                Good morning, {user?.name}! 👋
              </h1>
              <p className="text-blue-100 text-lg max-w-md opacity-90">
                {onboardingStep < 3
                  ? "Welcome to your new health companion. Let's get your profile ready for your first consultation."
                  : "Excellent! Your profile is ready. You can now schedule visits or explore doctors."}
              </p>
            </div>

            {/* Onboarding Progress Tracker */}
          </div>
        </div>

        {/* ===== MIDDLE SECTION - GUIDED ACTIONS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <ActionCard
            icon={<IconCalendar className="text-blue-500  w-10 h-10" />}
            title="Schedule First Consultation"
            description="No appointments on the horizon? Connect with top-rated doctors across 20+ specialties today."
            btnText="Book Appointment"
            secondary={false}
            onClick={() => setActiveModal("booking")}
          />

          <ActionCard
            icon={<IconSearch className="text-blue-500" />}
            title="Explore Specialists"
            description="Browse through our directory of verified healthcare providers to find the perfect match for your needs."
            btnText="Browse Doctors"
            secondary
            onClick={() => navigate("/doctors")}
          />
        </div>

        {/* ===== BOTTOM SECTION - SUPPORT & STATUS ===== */}

        {/* Calendar View */}
        <div className="mt-12 mb-10">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="font-extrabold text-2xl text-gray-900">
              Your Health Calendar
            </h3>
            <button
              onClick={() => notify("Loading Full Calendar View...")}
              className="text-blue-600 font-semibold hover:underline text-sm flex items-center"
            >
              Full View <IconArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
            {appointments.length === 0 ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <IconCalendar className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium italic">
                  Your schedule is currently clear.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Book an appointment to see your calendar fill up.
                </p>
              </div>
            ) : (
              <div className="w-full">
                {appointments.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-xl mb-3 border border-blue-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                        {new Date().getDate()}
                      </div>
                      <div>
                        <p className="font-bold text-blue-900">{app.title}</p>
                        <p className="text-xs text-blue-600 font-medium tracking-wide">
                          Confirmed • 10:00 AM Today
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setAppointments(
                          appointments.filter((a) => a.id !== app.id),
                        )
                      }
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MODALS ===== */}

      <Modal
        isOpen={activeModal === "booking"}
        onClose={() => setActiveModal(null)}
        title="Schedule Consultation"
      >
        <form
          onSubmit={handleBooking}
          className="space-y-4"
        >
          <div className="bg-white rounded-2xl shadow-sm p-8">
             {/* Consultant */}
            <SelectField
              label="Consultant"
              value={formData.logistics.doctor}
              onChange={(v) => handleChange("logistics", "doctor", v)}
              options={[
                "Select Doctor",
                ...filteredDoctors.map((doc) => doc.name),
              ]}
            />

            {/* Specialization */}
            <SelectField
              label="Specialization"
              value={formData.logistics.specialization}
              onChange={(v) => handleChange("logistics", "specialization", v)}
              options={["Select Specialization", ...specializations]}
            />
            <InputField
              label="reasons"
              value={formData.logistics.reason}
              onChange={(v) => handleChange("logistics", "reason", v)}
            />

            {/* Date */}
            <InputField
              label="Visit Date"
              type="date"
              value={formData.logistics.date}
              onChange={(v) => handleChange("logistics", "date", v)}
            />

            {/* Time */}
            <InputField
              label="Slot Time"
              type="time"
              step="3600"
              value={formData.logistics.time}
              onChange={(v) => handleChange("logistics", "time", v)}
            />
            <SelectField
              label="Priority"
              value={formData.logistics.priority}
              onChange={(v) => handleChange("logistics", "priority", v)}
              options={[ "NORMAL", "URGENT"]}
            />
          </div>

          {/* Appointment Mode */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => handleChange("logistics", "place", "ONLINE")}
              className={`p-4 rounded-2xl cursor-pointer border-2 ${
                formData.logistics.place === "ONLINE"
                  ? "bg-blue-50 border-blue-500"
                  : "bg-gray-50"
              }`}
            >
              <p className="text-xs font-bold uppercase">Video Call</p>
            </div>

            <div
              onClick={() => handleChange("logistics", "place", "OFFLINE")}
              className={`p-4 rounded-2xl cursor-pointer border-2 ${
                formData.logistics.place === "OFFLINE"
                  ? "bg-blue-50 border-blue-500"
                  : "bg-gray-50"
              }`}
            >
              <p className="text-xs font-bold uppercase">In-Clinic</p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg"
          >
            Confirm Appointment
          </button>
        </form>
      </Modal>

      {/* ===== NOTIFICATION ===== */}
      {notification && (
        <Toast
          message={notification.msg}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

/**
 * REUSABLE INTERNAL COMPONENTS
 */
function ActionCard({
  icon,
  title,
  description,
  btnText,
  secondary = false,
  onClick,
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md text-center flex flex-col h-full border border-gray-50">
      <div
        className={`w-16 h-16 ${secondary ? "bg-blue-50" : "bg-blue-100"} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <button
        onClick={onClick}
        className={`w-full px-6 py-3 ${secondary ? "bg-blue-100 text-blue-600 hover:bg-blue-200" : "bg-blue-600 text-white hover:bg-blue-700"} font-semibold rounded-xl transition-colors`}
      >
        {btnText}
      </button>
    </div>
  );
}

