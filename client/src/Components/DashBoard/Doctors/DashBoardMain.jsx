import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { Tooltip } from "react-tooltip";

import {
  FaUsers,
  FaCheck,
  FaTimes,
  FaFileMedical,
  FaCommentDots,
  FaVideo,
  FaSpinner,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartTooltip,
} from "recharts";

import { Link } from "react-router-dom";

import { dummyPatients } from "./dummyData";

import Scheduler from "./BigCalender";
import QuickActions from "./QuickActions";

// =========================================================
// COLORS
// =========================================================

const COLORS = [
  "#3B82F6",
  "#FBBF24",
  "#10B981",
];

// =========================================================
// MAIN COMPONENT
// =========================================================

const DashBoardMain = () => {
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    appointmentRequests,
    setAppointmentRequests,
  ] = useState([]);

  // =========================================================
  // FETCH DATA
  // =========================================================

  const fetchDashboardData =
    useCallback(async () => {
      try {
        setLoading(true);

        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );

        setPatients(dummyPatients);

        setAppointmentRequests(
          dummyPatients.slice(0, 5)
        );
      } catch (err) {
        console.error(err);

        setError(
          "Something went wrong while loading dashboard."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // =========================================================
  // NEXT PATIENT
  // =========================================================

  const nextPatient = useMemo(() => {
    const sortedPatients = [
      ...patients,
    ].sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

    return (
      sortedPatients.find(
        (p) =>
          p.status === "Upcoming" ||
          p.status === "On Going"
      ) || null
    );
  }, [patients]);

  // =========================================================
  // CHART DATA
  // =========================================================

  const chartData = useMemo(() => {
    const newPatients =
      patients.filter(
        (p) => p.type === "New"
      ).length;

    const oldPatients =
      patients.filter(
        (p) => p.type === "Old"
      ).length;

    const ongoingPatients =
      patients.filter(
        (p) => p.status === "On Going"
      ).length;

    return [
      {
        name: "New Patients",
        value: newPatients,
      },

      {
        name: "Old Patients",
        value: oldPatients,
      },

      {
        name: "Ongoing",
        value: ongoingPatients,
      },
    ];
  }, [patients]);

  // =========================================================
  // REVIEW DATA
  // =========================================================

  const reviewData = useMemo(() => {
    const total =
      patients.length || 1;

    const completed = Math.round(
      (patients.filter(
        (p) =>
          p.status === "Completed"
      ).length /
        total) *
        100
    );

    const ongoing = Math.round(
      (patients.filter(
        (p) =>
          p.status === "On Going"
      ).length /
        total) *
        100
    );

    const upcoming = Math.round(
      (patients.filter(
        (p) =>
          p.status === "Upcoming"
      ).length /
        total) *
        100
    );

    return [
      {
        label: "Completed",
        percent: completed,
      },

      {
        label: "On Going",
        percent: ongoing,
      },

      {
        label: "Upcoming",
        percent: upcoming,
      },
    ];
  }, [patients]);

  // =========================================================
  // STATS
  // =========================================================

  const statCards = useMemo(
    () => [
      {
        title: "Total Patients",
        value: patients.length,
      },

      {
        title: "Upcoming",
        value: patients.filter(
          (p) =>
            p.status === "Upcoming"
        ).length,
      },

      {
        title: "Completed",
        value: patients.filter(
          (p) =>
            p.status === "Completed"
        ).length,
      },
    ],
    [patients]
  );

  // =========================================================
  // ACCEPT REQUEST
  // =========================================================

  const handleAcceptRequest = (
    id
  ) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status: "Upcoming",
            }
          : patient
      )
    );

    setAppointmentRequests((prev) =>
      prev.filter(
        (p) => p.id !== id
      )
    );
  };

  // =========================================================
  // REJECT REQUEST
  // =========================================================

  const handleRejectRequest = (
    id
  ) => {
    setAppointmentRequests((prev) =>
      prev.filter(
        (patient) =>
          patient.id !== id
      )
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        {error}
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="space-y-8 p-4 md:p-6 bg-[#f8fafc] min-h-screen">

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {statCards.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* MIDDLE SECTION */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* ========================================================= */}
        {/* SUMMARY */}
        {/* ========================================================= */}

        <Card title="Patients Summary">

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={chartData}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {chartData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}
                </Pie>

                <RechartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">

            {chartData.map(
              (item, index) => (
                <LegendItem
                  key={item.name}
                  color={
                    COLORS[index]
                  }
                  label={`${item.name}: ${item.value}`}
                />
              )
            )}
          </div>
        </Card>

        {/* ========================================================= */}
        {/* APPOINTMENTS */}
        {/* ========================================================= */}

        <Card title="Today's Appointments">

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

            {patients.length ===
            0 ? (
              <EmptyState text="No appointments found." />
            ) : (
              patients.map(
                (patient) => (
                  <AppointmentCard
                    key={
                      patient.id
                    }
                    patient={
                      patient
                    }
                  />
                )
              )
            )}
          </div>
        </Card>

        {/* ========================================================= */}
        {/* NEXT PATIENT */}
        {/* ========================================================= */}

        <Card title="Next Patient Details">

          {!nextPatient ? (
            <EmptyState text="No patient available." />
          ) : (
            <>
              {/* STATUS */}

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                  nextPatient.status ===
                  "Completed"
                    ? "bg-green-100 text-green-700"
                    : nextPatient.status ===
                      "On Going"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {
                  nextPatient.status
                }
              </span>

              {/* HEADER */}

              <div className="my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex items-center gap-3">

                  <Avatar
                    text={nextPatient.name
                      ?.slice(
                        0,
                        2
                      )
                      .toUpperCase()}
                  />

                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {
                        nextPatient.name
                      }
                    </h2>

                    <p className="text-sm text-gray-500">
                      {
                        nextPatient.checkup
                      }
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Patient ID
                  </p>

                  <p className="font-semibold">
                    {
                      nextPatient.id
                    }
                  </p>
                </div>
              </div>

              {/* INFO */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                <Info
                  label="DOB"
                  value={
                    nextPatient.dob
                  }
                />

                <Info
                  label="Gender"
                  value={
                    nextPatient.sex
                  }
                />

                <Info
                  label="Weight"
                  value={
                    nextPatient.weight
                  }
                />

                <Info
                  label="Height"
                  value={
                    nextPatient.height
                  }
                />
              </div>

              {/* HISTORY */}

              <div className="mt-6">

                <p className="text-sm text-gray-500 mb-2">
                  Patient
                  History
                </p>

                <div className="flex flex-wrap gap-2">

                  {nextPatient.history?.map(
                    (
                      item,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
                        className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-lg"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* ACTIONS */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">

                <Link
                  to={`/video-call/${nextPatient.id}`}
                  data-tooltip-id="video"
                  data-tooltip-content="Video Call"
                  className="flex items-center justify-center py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <FaVideo />
                </Link>

                <Tooltip id="video" />

                <button className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">

                  <FaFileMedical />
                </button>

                <button className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">

                  <FaCommentDots />
                </button>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM SECTION */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* ========================================================= */}
        {/* REVIEWS */}
        {/* ========================================================= */}

        <Card title="Patient Reviews">

          {reviewData.map(
            (item) => (
              <ProgressBar
                key={item.label}
                label={
                  item.label
                }
                percent={
                  item.percent
                }
              />
            )
          )}
        </Card>

        {/* ========================================================= */}
        {/* REQUESTS */}
        {/* ========================================================= */}

        <Card title="Appointment Requests">

          {appointmentRequests.length ===
          0 ? (
            <EmptyState text="No appointment requests." />
          ) : (
            appointmentRequests.map(
              (patient) => (
                <RequestCard
                  key={
                    patient.id
                  }
                  patient={
                    patient
                  }
                  onAccept={
                    handleAcceptRequest
                  }
                  onReject={
                    handleRejectRequest
                  }
                />
              )
            )
          )}
        </Card>

        {/* ========================================================= */}
        {/* QUICK ACTIONS */}
        {/* ========================================================= */}

        <QuickActions />
      </div>

      {/* ========================================================= */}
      {/* SCHEDULER */}
      {/* ========================================================= */}

      <Scheduler />
    </div>
  );
};

// =========================================================
// CARD
// =========================================================

const Card = React.memo(
  ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
      <h2 className="font-semibold text-gray-700 mb-5 text-lg">
        {title}
      </h2>

      {children}
    </div>
  )
);

// =========================================================
// STAT CARD
// =========================================================

const StatCard = React.memo(
  ({ title, value }) => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm flex items-center justify-between">

      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {value}
        </h2>
      </div>

      <div className="w-14 h-14 rounded-full border-4 border-blue-600 flex items-center justify-center text-blue-600 text-xl">

        <FaUsers />
      </div>
    </div>
  )
);

// =========================================================
// APPOINTMENT CARD
// =========================================================

const AppointmentCard =
  React.memo(
    ({ patient }) => (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 p-4 rounded-xl hover:shadow transition">

        <div className="flex items-center gap-3">

          <Avatar
            text={patient.name?.charAt(
              0
            )}
          />

          <div>
            <h3 className="font-medium text-gray-700">
              {patient.name}
            </h3>

            <p className="text-sm text-gray-500">
              {patient.checkup ||
                "Health Checkup"}
            </p>
          </div>
        </div>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-medium w-fit">

          {patient.status ===
          "On Going"
            ? "On Going"
            : patient.appointment}
        </span>
      </div>
    )
  );

// =========================================================
// REQUEST CARD
// =========================================================

const RequestCard = React.memo(
  ({
    patient,
    onAccept,
    onReject,
  }) => (
    <div className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-xl hover:shadow-sm transition">

      <div className="flex items-center gap-3">

        <Avatar
          text={patient.name?.charAt(
            0
          )}
        />

        <div>
          <p className="font-medium text-gray-700">
            {patient.name}
          </p>

          <p className="text-xs text-gray-500">
            {patient.checkup}
          </p>
        </div>
      </div>

      <div className="flex gap-2">

        <button
          onClick={() =>
            onAccept(
              patient.id
            )
          }
          className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
        >
          <FaCheck />
        </button>

        <button
          onClick={() =>
            onReject(
              patient.id
            )
          }
          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )
);

// =========================================================
// PROGRESS BAR
// =========================================================

const ProgressBar = ({
  label,
  percent,
}) => (
  <div className="mb-5">

    <div className="flex justify-between mb-1 text-sm">

      <span>{label}</span>

      <span>{percent}%</span>
    </div>

    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-500"
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
  </div>
);

// =========================================================
// AVATAR
// =========================================================

const Avatar = ({ text }) => (
  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">

    {text}
  </div>
);

// =========================================================
// INFO
// =========================================================

const Info = ({
  label,
  value,
}) => (
  <div>
    <p className="text-gray-400 text-sm">
      {label}
    </p>

    <p className="font-medium text-gray-700">
      {value || "-"}
    </p>
  </div>
);

// =========================================================
// LEGEND
// =========================================================

const LegendItem = ({
  color,
  label,
}) => (
  <div className="flex items-center gap-2 text-sm">

    <div
      className="w-3 h-3 rounded-full"
      style={{
        backgroundColor: color,
      }}
    />

    <span>{label}</span>
  </div>
);

// =========================================================
// EMPTY STATE
// =========================================================

const EmptyState = ({
  text,
}) => (
  <div className="flex flex-col items-center justify-center py-14 text-center">

    <img
      src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
      alt="empty"
      className="w-32 mb-4 opacity-70"
    />

    <p className="text-gray-400">
      {text}
    </p>
  </div>
);

export default DashBoardMain;