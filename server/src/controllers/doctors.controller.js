import mongoose from "mongoose";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      profilePhoto,
      biography,
      age,
      gender,
      dateOfBirth,
      address,
      city,
      state,
      pincode,
      mobileNumber,
      alternatePhone,
      specialization,
      experience,
      qualification,
      hospitalName,
      licenseNumber,
      consultationFee,
      availableDays,
      availableTime,
    } = req.body;

    const role = req.user.role;
    const file = req.file;

    //  Only ADMIN can create doctor
    if (role != "ADMIN" && role != "DOCTOR") {
      return res.status(403).json({ message: "Access denied!" });
    }

    //  Required fields check
    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !gender ||
      !dateOfBirth ||
      !specialization ||
      !experience ||
      !qualification ||
      !hospitalName ||
      !licenseNumber ||
      !consultationFee
    ) {
      return res.status(400).json({
        message: "All required fields must be provided!",
      });
    }

    if (name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters long" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Validate numbers
    if (age < 0 || age > 130) {
      return res.status(400).json({ message: "Invalid age!" });
    }

    if (experience < 0 || experience > 70) {
      return res.status(400).json({ message: "Invalid experience!" });
    }

    if (consultationFee < 0) {
      return res.status(400).json({ message: "Invalid consultation fee!" });
    }

    // Convert DOB if needed (DD-MM-YYYY → Date)
    let formattedDOB = dateOfBirth;
    if (typeof dateOfBirth === "string" && dateOfBirth.includes("-")) {
      const parts = dateOfBirth.split("-");
      if (parts[0].length === 2) {
        const [day, month, year] = parts;
        formattedDOB = new Date(`${year}-${month}-${day}`);
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "DOCTOR",
    });

    // Check user exists
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // License uniqueness check
    const existingLicense = await Doctor.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({
        message: "License number already exists!",
      });
    }

    if (file) {
      const base64 = file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`,
        {
          folder: "meddical-app",
        },
      );
      profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    // Create doctor
    const doctor = await Doctor.create({
      userId: user._id,
      profilePhoto,
      biography,
      age,
      gender,
      dateOfBirth: formattedDOB,
      address,
      city,
      state,
      pincode,
      mobileNumber,
      alternatePhone,
      specialization,
      experience,
      qualification,
      hospitalName,
      licenseNumber,
      consultationFee,
      availableDays,
      availableTime,
    });

    //  Optional: populate user
    await doctor.populate("userId", "-password");

    res.status(201).json({
      message: "Doctor created successfully!",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).populate("userId", "-password");
    res.json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required!" });
    }

    const doctor = await Doctor.findById(doctorId).populate(
      "userId",
      "-password",
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const role = req.user.role;
    const file = req.file;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required!" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (
      role != "DOCTOR" ||
      (role === "DOCTOR" && doctor.userId != req.user.id)
    ) {
      return res.status(403).json({ message: "Access denied!" });
    }

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }

    if (file) {
      if (doctor.profilePhoto.publicId) {
        await cloudinary.uploader.destroy(doctor.profilePhoto.publicId);
      }

      const base64 = file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`,
        {
          folder: "meddical-app",
        },
      );
      const profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id,
      };

      req.body.profilePhoto = profilePhoto;
    }

    doctor.set(req.body);
    await doctor.save();

    res.json({ message: "Doctor updated successfully!", doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export { addDoctor, getDoctors, getDoctorById, updateDoctor };
