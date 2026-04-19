import Medication from "../models/Medication.model.js";

export const addMedication = async (req, res) => {
  try {
    const role = req.user.role;

    // 🔒 Only Doctor/Admin can add
    if (role !== "DOCTOR" && role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const {
      patientId,
      doctor,
      medicationName,
      doseAmount,
      doseUnit,
      strength,
      route,
      frequency,
      specialInstructions,
      startDate,
      endDate,
      durationInDays,
      prescribedBy,
      status,
    } = req.body;

    // ✅ Validation
    if (!patientId || !medicationName || !doseAmount || !frequency) {
      return res.status(400).json({
        message: "Required fields missing",
		success: false,
      });
    }

    const medication = new Medication({
      patientId,
      doctor,
      medicationName,
      doseAmount,
      doseUnit,
      strength,
      route,
      frequency,
      specialInstructions,
      startDate,
      endDate,
      durationInDays,
      prescribedBy,
      status,
    });

    await medication.save();

    res.status(201).json({
      message: "Medication added successfully",
      data: medication,
	  success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error!",
	  success: false,
    });
  }
};

export const getMedicationByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;
    const role = req.user.role;

    // 🔒 Patient can only see their own
    if (role === "PATIENT" && patientId !== req.user.id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const medications = await Medication.find({ patientId })
      .populate({
        path: "doctor",
        select: "userId specialization",
        populate: {
          path: "userId",
          select: "name email -_id",
        },
      })
      .populate({
        path: "prescribedBy",
        select: "userId",
        populate: {
          path: "userId",
          select: "name email -_id",
        },
      })
      .sort({ createdAt: -1 }); // latest first

    if (!medications.length) {
      return res.status(404).json({
        message: "No medications found for this patient",
		success: false,
      });
    }

    return res.status(200).json({
      count: medications.length,
      data: medications,
	  success: true,
    });
  } catch (error) {
   return res.status(500).json({
      message: error.message || "Internal server error!",
	  success: false,
    });
  }
};