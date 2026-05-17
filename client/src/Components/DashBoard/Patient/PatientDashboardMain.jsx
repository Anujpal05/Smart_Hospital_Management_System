import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Calendar,
  FileText,
  Pill,
  MessageSquare,
  CreditCard,
  Activity,
  Clock,
  ChevronRight,
  Video,
  Download,
  Droplet,
  HeartPulse,
  Thermometer,
  Sparkles,
  Bell,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getAllAppointmentsAction,
} from "../../../actions/doctorActions";

// ======================================================
// MAIN DASHBOARD
// ======================================================

export default function PatientDashboardMain() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    appointments = [],
    loading,
  } = useSelector(
    (state) =>
      state.appointments || {}
  );

  const [mobileSidebar, setMobileSidebar] =
    useState(false);

  // ======================================================
  // FETCH APPOINTMENTS
  // ======================================================

  useEffect(() => {

    dispatch(
      getAllAppointmentsAction()
    );

  }, [dispatch]);

  // ======================================================
  // UPCOMING APPOINTMENT
  // ======================================================

  const upcomingAppointment =
    useMemo(() => {

      if (!appointments?.length)
        return null;

      return appointments[0];

    }, [appointments]);

  // ======================================================
  // DUMMY LAB REPORTS
  // ======================================================

  const [labReports] = useState([
    {
      id: 1,
      title:
        "Complete Blood Count",
      date: "Mar 10, 2026",
      status: "Normal",
    },
    {
      id: 2,
      title: "Lipid Panel",
      date: "Mar 08, 2026",
      status:
        "Review Required",
    },
    {
      id: 3,
      title: "Vitamin D Test",
      date: "Feb 20, 2026",
      status: "Normal",
    },
  ]);

  // ======================================================
  // VITALS
  // ======================================================

  const vitals = useMemo(
    () => [
      {
        icon: HeartPulse,
        label: "Heart Rate",
        value: "72",
        unit: "bpm",
        color:
          "text-rose-500",
        bg: "bg-rose-50",
      },
      {
        icon: Activity,
        label:
          "Blood Pressure",
        value: "120/80",
        unit: "mmHg",
        color:
          "text-blue-500",
        bg: "bg-blue-50",
      },
      {
        icon: Droplet,
        label: "Glucose",
        value: "95",
        unit: "mg/dL",
        color:
          "text-purple-500",
        bg: "bg-purple-50",
      },
      {
        icon: Thermometer,
        label: "Temperature",
        value: "98.6",
        unit: "°F",
        color:
          "text-orange-500",
        bg: "bg-orange-50",
      },
    ],
    []
  );

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <div className="text-center space-y-4">

          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="font-semibold text-slate-700">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden">

      {/* ====================================================== */}
      {/* MOBILE HEADER */}
      {/* ====================================================== */}

      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">

        <h1 className="font-bold text-xl text-blue-700">
          Patient Portal
        </h1>

        <button
          onClick={() =>
            setMobileSidebar(true)
          }
          className="p-2 rounded-xl border border-slate-200"
        >
          <Menu />
        </button>
      </div>

      {/* ====================================================== */}
      {/* MOBILE SIDEBAR */}
      {/* ====================================================== */}

      {mobileSidebar && (

        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">

          <div className="w-72 h-full bg-white shadow-2xl p-6 overflow-y-auto">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-2xl font-bold text-blue-700">
                Dashboard
              </h2>

              <button
                onClick={() =>
                  setMobileSidebar(false)
                }
              >
                <X />
              </button>
            </div>

            <SidebarItem
              icon={User}
              label="Profile"
            />

            <SidebarItem
              icon={Calendar}
              label="Appointments"
            />

            <SidebarItem
              icon={FileText}
              label="Reports"
            />

            <SidebarItem
              icon={Pill}
              label="Prescriptions"
            />

            <SidebarItem
              icon={CreditCard}
              label="Billing"
            />

            <SidebarItem
              icon={Settings}
              label="Settings"
            />
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ====================================================== */}
        {/* TOP HEADER */}
        {/* ====================================================== */}

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

          <div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Welcome back,
              {" "}
              {user?.name}
              👋
            </h1>

            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Here is your latest health overview and appointment updates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <button className="relative bg-white border border-slate-200 p-3 rounded-2xl shadow-sm hover:bg-slate-50 transition">

              <Bell className="h-5 w-5 text-slate-600" />

              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                {user?.name?.[0]}
              </div>

              <div>

                <h3 className="font-bold text-sm text-slate-900">
                  {user?.name}
                </h3>

                <p className="text-xs text-slate-500">
                  Patient ID: PT-88293
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* AI INSIGHT */}
        {/* ====================================================== */}

        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">

            <div className="flex items-start gap-4">

              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-lg">
                <Sparkles className="text-yellow-300" />
              </div>

              <div>

                <h2 className="text-2xl font-bold mb-2">
                  AI Health Insight
                </h2>

                <p className="text-blue-100 max-w-2xl text-sm md:text-base leading-relaxed">
                  Based on your recent reports, your cardiovascular health is stable.
                  Vitamin D levels are slightly low. Continue exercise and maintain a healthy diet.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/patient/ai-assistant"
                )
              }
              className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all"
            >
              View Full AI Report
            </button>
          </div>
        </div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ====================================================== */}
          {/* LEFT SECTION */}
          {/* ====================================================== */}

          <div className="xl:col-span-2 space-y-6">

            {/* ====================================================== */}
            {/* APPOINTMENT CARD */}
            {/* ====================================================== */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">

                  <Calendar className="text-blue-600" />

                  Upcoming Appointment
                </h2>

                <button className="text-blue-600 font-semibold text-sm hover:text-blue-800">
                  View All
                </button>
              </div>

              {!upcomingAppointment ? (

                <div className="p-10 text-center text-slate-500">
                  No upcoming appointments.
                </div>

              ) : (

                <div className="p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                  <div className="flex flex-col sm:flex-row items-start gap-5">

                    <img
                      src={`https://ui-avatars.com/api/?name=${upcomingAppointment?.doctorName || "Doctor"}&background=eff6ff&color=1d4ed8`}
                      alt="Doctor"
                      className="w-16 h-16 rounded-full border border-slate-200"
                    />

                    <div>

                      <h3 className="text-xl font-bold text-slate-900">
                        {
                          upcomingAppointment?.doctorName ||
                          "Dr. Sarah Jenkins"
                        }
                      </h3>

                      <p className="text-slate-500 mt-1">
                        {
                          upcomingAppointment?.specialty ||
                          "Cardiology Specialist"
                        }
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">

                        <span className="bg-slate-100 px-3 py-2 rounded-xl flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-500" />
                          Mar 15, 2026
                        </span>

                        <span className="bg-slate-100 px-3 py-2 rounded-xl flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          10:00 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full sm:w-auto">

                    <span className="inline-flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                      <Video className="h-4 w-4" />
                      Telemedicine
                    </span>

                    <button
                      onClick={() =>
                        navigate(
                          `/video-call/${upcomingAppointment?._id || "appointment-room-1"}`
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all"
                    >
                      Join Video Call
                    </button>

                    <button className="text-sm text-slate-500 hover:text-slate-700 underline">
                      Reschedule Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ====================================================== */}
            {/* VITALS */}
            {/* ====================================================== */}

            <div>

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-xl font-bold text-slate-900">
                  Latest Health Vitals
                </h2>

                <button className="text-blue-600 text-sm font-semibold">
                  View History
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {vitals.map(
                  (
                    vital,
                    index
                  ) => (
                    <VitalCard
                      key={index}
                      {...vital}
                    />
                  )
                )}
              </div>
            </div>

            {/* ====================================================== */}
            {/* MEDICATIONS */}
            {/* ====================================================== */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Pill className="text-blue-600" />
                  Active Medications
                </h2>
              </div>

              <div className="divide-y divide-slate-100">

                <MedicationItem
                  name="Lisinopril"
                  dosage="10mg"
                  instructions="1 tablet after breakfast"
                  remaining={12}
                  total={30}
                />

                <MedicationItem
                  name="Atorvastatin"
                  dosage="20mg"
                  instructions="1 tablet at bedtime"
                  remaining={5}
                  total={30}
                  needsRefill
                />
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT SIDEBAR */}
          {/* ====================================================== */}

          <div className="space-y-6">

            {/* ====================================================== */}
            {/* QUICK ACTIONS */}
            {/* ====================================================== */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">

              <h2 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-4">
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <QuickAction
                  icon={Calendar}
                  label="Book Visit"
                  onClick={() =>
                    navigate(
                      "/appointments"
                    )
                  }
                />

                <QuickAction
                  icon={MessageSquare}
                  label="Messages"
                  onClick={() =>
                    navigate(
                      "/chat"
                    )
                  }
                />

                <QuickAction
                  icon={Pill}
                  label="Refill Rx"
                  onClick={() =>
                    navigate(
                      "/prescriptions"
                    )
                  }
                />

                <QuickAction
                  icon={CreditCard}
                  label="Pay Bills"
                  alert
                  onClick={() =>
                    navigate(
                      "/billing"
                    )
                  }
                />
              </div>
            </div>

            {/* ====================================================== */}
            {/* LAB RESULTS */}
            {/* ====================================================== */}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-5 py-5 border-b border-slate-200 flex items-center justify-between">

                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">

                  <FileText className="text-blue-600" />

                  Recent Reports
                </h2>
              </div>

              <div className="p-3 space-y-2">

                {labReports.map(
                  (
                    report
                  ) => (
                    <LabResultItem
                      key={report.id}
                      title={
                        report.title
                      }
                      date={
                        report.date
                      }
                      status={
                        report.status
                      }
                    />
                  )
                )}
              </div>

              <div className="border-t border-slate-100 p-4 text-center">

                <button className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center justify-center gap-1 w-full">
                  View All Reports
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// SIDEBAR ITEM
// ======================================================

function SidebarItem({
  icon: Icon,
  label,
}) {

  return (

    <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-blue-50 transition mb-2 text-slate-700 hover:text-blue-700 font-medium">

      <Icon className="h-5 w-5" />

      {label}
    </button>
  );
}

// ======================================================
// VITAL CARD
// ======================================================

function VitalCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
  bg,
}) {

  return (

    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all">

      <div className="flex items-center justify-between mb-5">

        <div className={`p-3 rounded-2xl ${bg}`}>
          <Icon
            className={`h-5 w-5 ${color}`}
          />
        </div>

        <span className="text-xs uppercase tracking-wide text-slate-400 font-bold">
          Live
        </span>
      </div>

      <h3 className="text-sm text-slate-500 font-semibold uppercase tracking-wide">
        {label}
      </h3>

      <div className="mt-3 flex items-end gap-2">

        <span className="text-3xl font-extrabold text-slate-900">
          {value}
        </span>

        <span className="text-slate-500 pb-1 text-sm">
          {unit}
        </span>
      </div>
    </div>
  );
}

// ======================================================
// MEDICATION ITEM
// ======================================================

function MedicationItem({
  name,
  dosage,
  instructions,
  remaining,
  total,
  needsRefill,
}) {

  const percentage =
    (remaining / total) * 100;

  return (

    <div className="p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-6">

      <div>

        <h3 className="text-lg font-bold text-slate-900">
          {name}

          <span className="ml-2 text-slate-500 font-medium text-base">
            {dosage}
          </span>
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {instructions}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full xl:w-auto">

        <div className="w-full sm:w-52">

          <div className="flex justify-between text-xs mb-2 font-semibold">

            <span className="text-slate-500">
              {remaining} left
            </span>

            <span
              className={needsRefill
                ? "text-red-500"
                : "text-green-600"
              }
            >
              {needsRefill
                ? "Refill Needed"
                : "Good"
              }
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">

            <div
              className={`h-2 rounded-full ${
                needsRefill
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${percentage}%`,
              }}
            ></div>
          </div>
        </div>

        <button
          className={`px-5 py-3 rounded-2xl font-semibold text-sm transition-all ${
            needsRefill
              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          Request Refill
        </button>
      </div>
    </div>
  );
}

// ======================================================
// QUICK ACTION
// ======================================================

function QuickAction({
  icon: Icon,
  label,
  alert,
  onClick,
}) {

  return (

    <button
      onClick={onClick}
      className="relative bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-3xl p-5 transition-all group"
    >

      {alert && (
        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
      )}

      <div className="flex flex-col items-center text-center gap-3">

        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">

          <Icon className="h-6 w-6 text-blue-600" />
        </div>

        <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-700">
          {label}
        </span>
      </div>
    </button>
  );
}

// ======================================================
// LAB RESULT ITEM
// ======================================================

function LabResultItem({
  title,
  date,
  status,
}) {

  const isNormal =
    status === "Normal";

  return (

    <div className="flex items-center justify-between gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">

      <div className="min-w-0">

        <h4 className="font-bold text-slate-900 truncate">
          {title}
        </h4>

        <div className="flex flex-wrap items-center gap-2 mt-2">

          <span className="text-xs text-slate-500">
            {date}
          </span>

          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
              isNormal
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <button className="p-3 rounded-2xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all flex-shrink-0">
        <Download className="h-5 w-5" />
      </button>
    </div>
  );
}