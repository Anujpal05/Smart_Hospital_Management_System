import Admission from "../models/admission.model.js";
import Bed from "../models/bed.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";

export const admitPatient = async (req, res) => {
  try {
    const { patientId, doctorId, wardId, bedId } = req.body;
    const role = req.user.role;

    if (role !== "DOCTOR" && role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const existPatient = await Patient.findById(patientId);
    if (!existPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    const existDoctor = await User.findById(doctorId);
    if (!existDoctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }

    const admission = await Admission.create({
      patient: patientId,
      doctor: doctorId,
      ward: wardId,
      bed: bedId,
    });

    res.status(201).json(admission);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const dischargePatient = async (req, res) => {
  try {
    const role = req.user.role;
    const admissionId = req.params.id;

    if (role !== "DOCTOR" && role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const admission = await Admission.findById(admissionId);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found!" });
    }

    admission.status = "DISCHARGED";
    admission.dischargeDate = new Date();
    await admission.save();

    res.json({ message: "Patient discharged successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};
