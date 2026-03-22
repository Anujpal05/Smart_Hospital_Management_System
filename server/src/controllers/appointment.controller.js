import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";

export const createAppointment = async (req, res) => {
  try {
    const { date, reason, timeslot } = req.body;
    console.log(req.user)
    const userId = req.user.id;

    const existPatient = await User.findById(userId);
    console.log(existPatient)
    if (!existPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }
    if (!date) {
      return res.status(400).json({ message: "Date is required!" });
    }

    let formattedDate = date;
    if (typeof date === "string" && date.includes("-")) {
      const parts = date.split("-");
      if (parts[0].length === 2) {
        const [day, month, year] = parts;
        formattedDate = new Date(`${year}-${month}-${day}`);
      }
    }

    const payload = {
      user: userId,
      date: formattedDate,
      timeslot: timeslot,
      reason,
    };

    const appointment = await Appointment.create(payload);
    res.status(201).json(appointment);
  } catch (error) { 
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const responseAppointment = async (req, res) => {
  try {
    const role = req.user.role;
    const id = req.params.id;
    const { doctorId, patientId, date, status, timeslot } = req.body;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }
    
    const appointment = await Appointment.findById(id);
    appointment.patient = patientId;
    appointment.doctor = doctorId;
    appointment.status = status;

    if (date) {
      appointment.date = date;
    }

    if (timeslot) {
      appointment.timeslot = timeslot;
    }

    await appointment.save();
    res.json({ message: "Appointment accepted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.body;
    const role = req?.user?.role;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const appointments = await Appointment.find({ doctor: id });

    res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const role = req?.user?.role;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const appointments = await Appointment.find({});
    return res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getPendingAppointments = async (req, res) => {
  try {
    const role = req?.user?.role;
    if (role == "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const appointments = await Appointment.find({ status: "PENDING" });
    return res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const role = req?.user?.role;
    const userId = req?.user?.id;
    if (role === "PATIENT" && userId !== id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const appointment = await Appointment.findById(id);
    res.json(appointment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const id = req?.params?.id;
    const role = req?.user?.role;
    const userId = req?.user?.id;
    if (role === "PATIENT" && userId !== id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const appointments = await Appointment.find({ patient: id });
    res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};
