import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Calendar,
  Clock,
  Search,
  MapPin,
  Stethoscope,
  Video,
  User,
  ChevronRight,
  Filter,
  Star,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

// ======================================================
// DUMMY DATA
// ======================================================

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    experience: "12 Years",
    hospital: "CityCare Hospital",
    rating: 4.9,
    fee: 1200,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500",
    available: true,
    type: "Video Consultation",
    slots: [
      "09:00 AM",
      "10:30 AM",
      "12:00 PM",
      "03:30 PM",
    ],
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialty: "Neurologist",
    experience: "8 Years",
    hospital: "Apollo Medical",
    rating: 4.8,
    fee: 1500,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500",
    available: true,
    type: "Clinic Visit",
    slots: [
      "11:00 AM",
      "01:00 PM",
      "04:00 PM",
    ],
  },
  {
    id: 3,
    name: "Dr. Emma Watson",
    specialty: "Dermatologist",
    experience: "10 Years",
    hospital: "SkinPlus Care",
    rating: 4.7,
    fee: 1000,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500",
    available: false,
    type: "Video Consultation",
    slots: [],
  },
  {
    id: 4,
    name: "Dr. Daniel Lee",
    specialty: "Orthopedic",
    experience: "15 Years",
    hospital: "BoneCare Center",
    rating: 4.9,
    fee: 1800,
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500",
    available: true,
    type: "Clinic Visit",
    slots: [
      "09:30 AM",
      "11:30 AM",
      "02:30 PM",
    ],
  },
];

const specialties = [
  "All",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedic",
];

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function AppointmentBookingPage() {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [selectedSpecialty,
    setSelectedSpecialty] =
    useState("All");

  const [selectedDoctor,
    setSelectedDoctor] =
    useState(null);

  const [selectedDate,
    setSelectedDate] =
    useState("");

  const [selectedSlot,
    setSelectedSlot] =
    useState("");

  const [bookingSuccess,
    setBookingSuccess] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  // ======================================================
  // FILTERED DOCTORS
  // ======================================================

  const filteredDoctors =
    useMemo(() => {

      return doctorsData.filter(
        (doctor) => {

          const matchSearch =
            doctor.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            doctor.specialty
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchSpecialty =
            selectedSpecialty ===
              "All" ||
            doctor.specialty ===
              selectedSpecialty;

          return (
            matchSearch &&
            matchSpecialty
          );
        }
      );

    }, [search,
      selectedSpecialty]);

  // ======================================================
  // BOOK APPOINTMENT
  // ======================================================

  const handleBookAppointment =
    async () => {

      if (
        !selectedDoctor ||
        !selectedDate ||
        !selectedSlot
      ) {

        alert(
          "Please select all details"
        );

        return;
      }

      try {

        setLoading(true);

        // =====================================
        // API CALL
        // =====================================

        // await axios.post("/api/appointments", {
        //   doctorId: selectedDoctor.id,
        //   date: selectedDate,
        //   slot: selectedSlot,
        // });

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1500
            )
        );

        setBookingSuccess(true);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  // ======================================================
  // SUCCESS STATE
  // ======================================================

  if (bookingSuccess) {

    return (

      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-10 text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-14 w-14 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Appointment Booked!
          </h1>

          <p className="text-slate-500 mt-4 leading-relaxed">
            Your appointment has been successfully scheduled with
            {" "}
            <span className="font-bold text-slate-800">
              {selectedDoctor?.name}
            </span>
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 mt-8 text-left space-y-3 border border-slate-200">

            <div className="flex items-center justify-between">
              <span className="text-slate-500">
                Doctor
              </span>
              <span className="font-semibold text-slate-900">
                {selectedDoctor?.name}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">
                Specialty
              </span>
              <span className="font-semibold text-slate-900">
                {selectedDoctor?.specialty}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">
                Date
              </span>
              <span className="font-semibold text-slate-900">
                {selectedDate}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">
                Time
              </span>
              <span className="font-semibold text-slate-900">
                {selectedSlot}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

            <button
              onClick={() =>
                navigate(
                  "/patient/dashboard"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all"
            >
              Go Dashboard
            </button>

            <button
              onClick={() =>
                setBookingSuccess(false)
              }
              className="border border-slate-300 hover:bg-slate-100 py-3 rounded-2xl font-semibold transition-all"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          <div>

            <h1 className="text-4xl font-extrabold text-slate-900">
              Book Appointment
            </h1>

            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Find the best doctor and schedule your appointment easily.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
              P
            </div>

            <div>

              <h3 className="font-bold text-slate-900">
                Patient Portal
              </h3>

              <p className="text-xs text-slate-500">
                Secure HMS System
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* SEARCH + FILTER */}
        {/* ====================================================== */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">

            {/* SEARCH */}

            <div className="relative">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />

              <input
                type="text"
                placeholder="Search doctors or specialties..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* SPECIALTY FILTER */}

            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">

              <div className="flex items-center gap-2 text-slate-500 font-semibold whitespace-nowrap">
                <Filter className="h-4 w-4" />
                Filters:
              </div>

              {specialties.map(
                (specialty) => (
                  <button
                    key={specialty}
                    onClick={() =>
                      setSelectedSpecialty(
                        specialty
                      )
                    }
                    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                      selectedSpecialty ===
                      specialty
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {specialty}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] h-[800px] overflow-y-auto gap-6">

          {/* ====================================================== */}
          {/* DOCTOR LIST */}
          {/* ====================================================== */}

          <div className="space-y-5">

            {filteredDoctors.map(
              (doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  selectedDoctor={selectedDoctor}
                  setSelectedDoctor={setSelectedDoctor}
                />
              )
            )}

            {filteredDoctors.length === 0 && (

              <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500 shadow-sm">

                <AlertCircle className="mx-auto h-12 w-12 mb-4 text-slate-400" />

                No doctors found.
              </div>
            )}
          </div>

          {/* ====================================================== */}
          {/* BOOKING PANEL */}
          {/* ====================================================== */}

          <div className="sticky top-6 h-fit bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-200">

              <h2 className="text-2xl font-bold text-slate-900">
                Appointment Details
              </h2>

              <p className="text-slate-500 mt-2 text-sm">
                Select doctor, date and available time slot.
              </p>
            </div>

            {!selectedDoctor ? (

              <div className="p-10 text-center text-slate-500">

                <User className="mx-auto h-12 w-12 mb-4 text-slate-400" />

                Please select a doctor.
              </div>

            ) : (

              <div className="p-6 space-y-6">

                {/* DOCTOR */}

                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">

                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />

                  <div>

                    <h3 className="font-bold text-slate-900">
                      {selectedDoctor.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                </div>

                {/* DATE */}

                <div>

                  <label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Select Date
                  </label>

                  <div className="relative">

                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />

                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) =>
                        setSelectedDate(
                          e.target.value
                        )
                      }
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* SLOTS */}

                <div>

                  <label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Available Slots
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    {selectedDoctor.slots.map(
                      (slot) => (
                        <button
                          key={slot}
                          onClick={() =>
                            setSelectedSlot(
                              slot
                            )
                          }
                          className={`py-3 rounded-2xl border font-semibold transition-all ${
                            selectedSlot ===
                            slot
                              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                              : "border-slate-200 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* SUMMARY */}

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-3">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Consultation Fee
                    </span>
                    <span className="font-bold text-slate-900">
                      ₹{selectedDoctor.fee}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Appointment Type
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedDoctor.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Booking Status
                    </span>
                    <span className="text-green-600 font-semibold">
                      Available
                    </span>
                  </div>
                </div>

                {/* BUTTON */}

                <button
                  onClick={handleBookAppointment}
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading
                    ? "Booking Appointment..."
                    : "Confirm Appointment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// DOCTOR CARD
// ======================================================

function DoctorCard({
  doctor,
  selectedDoctor,
  setSelectedDoctor,
}) {

  return (

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">

      <div className="p-6 flex flex-col lg:flex-row gap-6">

        {/* IMAGE */}

        <div className="relative flex-shrink-0">

          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full lg:w-44 h-52 lg:h-44 rounded-2xl object-cover"
          />

          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
            doctor.available
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}>
            {doctor.available
              ? "Available"
              : "Unavailable"}
          </div>
        </div>

        {/* CONTENT */}

        <div className="flex-grow flex flex-col justify-between">

          <div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {doctor.name}
                </h2>

                <p className="text-blue-600 font-semibold mt-1 flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  {doctor.specialty}
                </p>
              </div>

              <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl font-bold flex items-center gap-2 w-fit">
                <Star className="h-4 w-4 fill-current" />
                {doctor.rating}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6 text-sm">

              <InfoItem
                icon={Clock}
                label="Experience"
                value={doctor.experience}
              />

              <InfoItem
                icon={MapPin}
                label="Hospital"
                value={doctor.hospital}
              />

              <InfoItem
                icon={Video}
                label="Consultation"
                value={doctor.type}
              />

              <InfoItem
                icon={Calendar}
                label="Fee"
                value={`₹${doctor.fee}`}
              />
            </div>
          </div>

          {/* BUTTON */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <CheckCircle2 className="h-4 w-4 text-green-500" />

              Verified Specialist
            </div>

            <button
              disabled={!doctor.available}
              onClick={() =>
                setSelectedDoctor(
                  doctor
                )
              }
              className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                selectedDoctor?.id ===
                doctor.id
                  ? "bg-blue-700 text-white"
                  : doctor.available
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              {selectedDoctor?.id ===
              doctor.id
                ? "Selected"
                : "Select Doctor"}

              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// INFO ITEM
// ======================================================

function InfoItem({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">

      <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wide font-bold">

        <Icon className="h-4 w-4" />

        {label}
      </div>

      <p className="mt-3 font-bold text-slate-900 text-sm">
        {value}
      </p>
    </div>
  );
}
