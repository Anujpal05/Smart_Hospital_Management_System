import Bed from "../models/bed.model.js";
import Ward from "../models/ward.model.js";

export const createBed = async (req, res) => {
  try {
    const role = req.user.role;
    const { wardId } = req.body;

    if (role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const ward = await Ward.findById(wardId);
    if (!ward) {
      return res.status(404).json({ message: "Ward not found!" });
    }

    const bed = await Bed.create(req.body);
    ward.beds.push(bed._id);
    ward.totalBeds++;
    await ward.save();
    res.status(201).json(bed);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getAllBeds = async (req, res) => {
  try {
    const role = req.user.role;
    if (role != "ADMIN" && role != "DOCTOR") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const beds = await Bed.find().populate("ward").populate("assignedPatient");
    res.json(beds);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getBedById = async (req, res) => {
  try {
    const role = req.user.role;
    const bedId = req.params.id;
    if (role != "ADMIN" && role != "DOCTOR") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const bed = await Bed.findById(bedId)
      .populate("ward")
      .populate("assignedPatient");
    res.json(bed);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const updateBedStatus = async (req, res) => {
  const { status } = req.body;
  const bed = await Bed.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );
  res.json(bed);
};
