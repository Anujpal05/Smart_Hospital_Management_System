import User from "../models/user.model.js";
import Patient from "../models/patient.model.js";
import cloudinary from "../config/cloudinary.js";

const addPatient = async (req, res) => {
  try {
    const role = req.user?.role;
    const { userId } = req.body;
    const file = req.file;

    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    if (!userId) {
      return res.status(404).json({ message: "User Id is required!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingPatient = await Patient.findOne({ userId });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exist" });
    }

    if(file){
      const base64 = file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64}` , {
        folder: "meddical-app"
      })
      const patientPhoto = {
        url : result.secure_url,
        publicId: result.public_id
      }
    }

    const patient = await Patient.create(req.body);
    res.json({ message: "Patient added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getPatients = async (req, res) => {
  try {
    const role = req.user?.role;
    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const patients = await Patient.find({}).populate("userId", "-password");
    res.json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patientId = req.params?.id;
    const role = req.user?.role;
    const id = req.user?.id;

    if (!patientId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const patient = await Patient.findById(patientId).populate(
      "userId",
      "-password",
    );

    if (role === "PATIENT" && patient.userId?._id != id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const updatePatient = async (req, res) => {
  try {
    const role = req.user.role;
    const id = req.user.id;
    const patientId = req.params?.id;
    const file = req.file;

    const patient = await Patient.findById(patientId).populate("userId");
    if (role === "PATIENT" && patient.userId != id) {
      return res.status(403).json({ message: "Access denied!" });
    }
    
    if(!patient){
      return res.status(404).json({ message: "Patient not found!" });
    }

    if(file){
      if(patient.profilePhoto.publicId){
        await cloudinary.uploader.destroy(patient.profilePhoto.publicId)
      }

      const base64 = file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64}` , {
        folder: "meddical-app"
      })

      patient.profilePhoto.url = result.secure_url;
      patient.profilePhoto.publicId = result.public_id;
    }

    patient.set(req.body);
    await patient.save();

    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const role = req.user?.role;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const patient = await Patient.findByIdAndDelete(req.params?.id);
    res.json("Patient deleted successfully!");
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const totalPatients = async (req, res) => {
  try {
    const role = req.user?.role;

    if (role != "ADMIN" && role != "DOCTOR") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const total = await Patient.countDocuments();
    res.json(total);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getPatientsByDoctor = async (req, res) => {
  try {
    const doctor_id = req.params?.id;
    const role = req.user?.role;

    if(role != "ADMIN" && role != "DOCTOR"){
      return res.status(403).json({ message: "Access denied!" });
    }

    const patients = await Patient.find({ doctor: doctor_id });
    res.json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error!" });
  }
};


const getMedicalReports = async (req, res) => {
  try {
    const patient_id = req.params?.id;

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

export {
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addPatient,
  getPatientsByDoctor,
  totalPatients,
  getMedicalReports,
};
