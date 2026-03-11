import Appointment from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, date, reason } = req.body;
    const existPatient = await User.findById(patient_id);
    if (!existPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }
    const payload = {
      patient: patient_id,
      doctor: doctor_id,
      appointmentDate: date,
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
    const status = req.status;
    const appointmentDate = req.date;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const appointment = await Appointment.findById(req?.params?.id);
    appointment.status = status;
    if (appointmentDate) {
      appointment.appointmentDate = appointmentDate;
    }
    await appointment.save();
    res.json({ message: "Appointment accepted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const id = req?.params?.id;
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
