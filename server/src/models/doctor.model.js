import mongoose from "mongoose";
import generateId from "../utils/generateId.js";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    doctorId: {
      type: String,
      unique: true,
      immutable: true,
    },
    profilePhoto: {
      url: {
        type: String,
        default: "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1738243131/profile_img.png",
      },
      publicId: { type: String },
    },
    biography: { type: String },
    age: { type: Number, required: true, min: 0, max: 130 },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
    mobileNumber: { type: String },
    alternatePhone: { type: String },
    specialization: [String],
    experience: { type: Number, min: 0, max: 70 },
    qualification: String,
    hospitalName: String,
    licenseNumber: { type: String, unique: true, immutable: true },

    consultationFee: Number,

    availableDays: [
      {
        type: String,
        default: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
    ],

    availableTime: {
      start: { type: String, default: "09:00 AM" },
      end: { type: String, default: "06:00 PM" },
    },
    assignedPatients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  { timestamps: true },
);

doctorSchema.pre("save", async function () {
  try {
    if (!this.doctorId) {
      this.doctorId = await generateId("DOCTOR", "DOC", 5);
    }
  } catch (error) {
    throw new Error("Something went wrong!" + error.message);
  }
});

export default mongoose.model("Doctor", doctorSchema);
