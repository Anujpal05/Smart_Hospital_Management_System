import Counter from "../models/counter.model.js";
import MedicalReport from "../models/medicalReport.model.js";

export const createMedicalReport = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      labId,
      sampleDetails,
      clinicalInformation,
      doctorReferral,
      remarks,
    } = req.body;

    const role = req.user.role;
    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    // Validation (important)
    if (!patient) {
      return res.status(400).json({
        message: "Patient is required",
      });
    }
    // Create new report
    const report = new MedicalReport({
      patient,
      doctor,
      labId,
      sampleDetails,
      clinicalInformation,
      doctorReferral,
      remarks,
    });

    // save → will trigger pre("save") middleware
    await report.save();

    res.status(201).json({
      message: "Medical record created successfully",
      data: report,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

export const getMedicalReports = async (req, res) => {
  try {
    const role = req.user.role;

    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const report = await MedicalReport.find({}).populate({
      path: "patient",
      populate:{
        path: "userId",
        select: "name email -_id",
      }
    }).populate({
      path: "doctor",
      select: "userId specialization mobileNumber alternatePhone",
      populate:{
        path: "userId",
        select: "name email -_id",
      }
    })
    if (!report) {
      return res.status(404).json({ message: "Medical record not found!" });
    }

    return res.status(200).json(report);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

export const getMedicalReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user.role;
    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const report = await MedicalReport.findById(id).populate({
      path: "patient",
      populate:{
        path: "userId",
        select: "name email -_id",
      }
    }).populate({
      path: "doctor",
      select: "userId specialization mobileNumber alternatePhone",
      populate:{
        path: "userId",
        select: "name email -_id",      
      }
    });

    if (!report) {
      return res.status(404).json({ message: "Medical record not found!" });
    }
    return res.status(200).json(report);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

export const getMedicalReportByPatientId = async (req, res) => {
  try {
    console.log(req.params);
    const patientId = req.params.id;
    const role = req.user.role;

    if (role == "PATIENT" && patientId != req.user.id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const reports = await MedicalReport.find({ patient: patientId }).populate({
      path: "patient",
      populate:{
        path: "userId",
        select: "name email -_id",
      }
    }).populate({
      path: "doctor",
      select: "userId specialization mobileNumber alternatePhone",
      populate:{
        path: "userId",
        select: "name email -_id",      
      }
    });
    if (!reports) {
      return res.status(404).json({ message: "Medical records not found!" });
    }
    return res.status(200).json(reports);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

export const updateMedicalReport = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user.role;
    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID",
      });
    }

    // Update data
    const updatedReport = await MedicalReport.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // apply schema validation
    })
      .populate("patient")
      .populate("doctor");

    // Not found
    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found!",
      });
    }

    res.status(200).json({
      message: "Medical report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error!",
    });
  }
};

export const deleteMedicalReport = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user.role;

    if (role != "DOCTOR" && role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    // Delete report
    const deletedReport = await MedicalReport.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Medical report not found!" });
    }

    res.status(200).json({ message: "Medical report deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

export const deleteALLMedicalReports = async (req, res) => {
  try {
    const reports = await MedicalReport.deleteMany({});
    return res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
