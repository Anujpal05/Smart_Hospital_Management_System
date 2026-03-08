import User from "../models/user.model.js";
import Patient from "../models/patient.model.js";

const addPatient = async (req, res) => {
  try {
    const {
      userId,
      age,
      gender,
      dateOfBirth,
      address,
      city,
      state,
      pincode,
      bloodGroup,
      emergencyContactName,
      emergencyContact,
    } = req.body;
    if (
      !userId ||
      !age ||
      !gender ||
      !dateOfBirth ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !bloodGroup ||
      !emergencyContactName ||
      !emergencyContactPhone
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingPatient = await Patient.findOne({ userId });
    if (existingPatient) {
      return res.state(400).json({ message: "Patient already exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "PATIENT" });
    res.json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getPatientById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const patient = await User.findById(userId);
    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const updatePatient = async (req, res) => {
  try {
    if (
      age < 0 ||
      (emergencyContactPhone != null &&
        (typeof emergencyContactPhone != "number" ||
          emergencyContactPhone.length() != 10))
    ) {
      return res.status(400).json({ message: "Invalid input!" });
    }

    const patient = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await User.findByIdAndDelete(req.params.id);
    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const totalPatients = async (req, res) => {
  try {
    const total = await Patient.countDocuments({ role: "PATIENT" });
    res.json(total);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getMedicalReports = async (req, res) => {
  try {
    const patient_id = req.params.id;

    const medicalRecords =
      await Patient.findById(patient_id).populate("medicalRecords");
    if (!medicalRecords) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    const patient = await Patient.findById(patient_id);

    res.json(patient.medicalRecords);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export { getPatients, getPatientById, updatePatient, deletePatient , addPatient};
