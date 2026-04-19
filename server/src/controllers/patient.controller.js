import User from "../models/user.model.js";
import Patient from "../models/patient.model.js";
import cloudinary from "../config/cloudinary.js";

const addPatient = async (req, res) => {
  try {
    const role = req.user?.role;
    const { userId } = req.body;
    console.log("Add patient request by user:", userId);
    const file = req.file;

    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    if (!userId) {
      return res.status(404).json({ message: "User Id is required!" });
    }

    const user = await User.findOne({ userId : userId });
    console.log("User found for patient creation:");
    if (!user) {
      return res.status(404).json({ message: "User not found!" ,success: false});
    }

    const existingPatient = await Patient.findOne({ userId : user._id });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exist" ,success: false});
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

    const patientData = {
  ...req.body,
  userId: user._id, 
    };
    console.log("Creating patient with data:", patientData);

    const patient = await Patient.create(patientData);
    return res.json({ message: "Patient added successfully!" ,success: true, data: patient });
  } catch (error) {
    console.error("Add patient error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!",success: false });
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
const getPatientByuserId = async (req, res) => {
  try {
    const userId = req.params?.id;
    const role = req.user?.role;
    const id = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const patient = await Patient.findOne({ userId }).populate(
      "userId",
      "-password",
    );

    if (role === "PATIENT" && patient.userId?._id != id) {
      return res.status(403).json({ message: "Access denied!",success: false });
    }

    if (!patient) {
      return res.status(404).json({ message: "Patient not found!",success: false });
    }

    return res.json({ message: "Patient fetched successfully!",success: true, data: patient });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!",success: false });
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
  getPatientByuserId
};
