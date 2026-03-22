import Ward from "../models/ward.model.js";

export const createWard = async (req, res) => {
  try {
    const role = req.user.role;
    if (role != "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const { wardName, wardType, floor } = req.body;
    const ward = await Ward.create({ wardName, wardType, floor });
    res.status(201).json({ message: "Ward created successfully!", ward });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getWardById = async (req, res) => {
  try {
    const role = req.user.role;
    const wardId = req.params.id;
    if (role != "ADMIN" && role != "DOCTOR") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const ward = await Ward.findById(wardId).populate("beds");
    res.status(200).json(ward);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getAllWards = async (req, res) => {
  try {
    const role = req.user.role;
    if (role != "ADMIN" && role != "DOCTOR") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const wards = await Ward.find({}).populate("beds");
    res.json(wards);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};
