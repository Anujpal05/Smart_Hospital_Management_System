import Admission from "../models/admission.model.js";
import Bed from "../models/bed.model.js";
import User from "../models/user.model.js";

export const admitPatient = async (req, res) => {
  try {
    const { patient, doctor, bed } = req.body;
    const role = req.user.role;

    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const existPatient = await User.findById(patient);
    if (!existPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    const existDoctor = await User.findById(doctor);
    if (!existDoctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }

    await Bed.findByIdAndUpdate(bed, {
      status: "OCCUPIED",
      assignedPatient: patient,
    });

    const admission = await Admission.create({
      patient,
      doctor,
      bed,
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
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const admission = await Admission.findById(req?.params?.id);

    admission.status = "DISCHARGED";
    admission.dischargeDate = new Date();
    await admission.save();

    await Bed.findByIdAndUpdate(admission.bed, {
      status: "AVAILABLE",
      assignedPatient: null,
    });

    res.json({ message: "Patient discharged successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};
