import mongoose from "mongoose";
import generateId from "../utils/generateId.js";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    patientId: {
      type: String,
      unique: true,
      immutable: true,
    },
    age: { type: Number, required: true, min: 0, max: 130 },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    //Weight in kg and Height in cm
    weight: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    nationality: { type: String, default: "Indian" },
    profilePhoto:{
      url:{type: String , default : "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1738243131/profile_img.png"},
      publicId:{type : String}
    },
    medicalRecords: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" },
    ],
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    admissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admission" }],
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bill" }],
  },
  { timestamps: true },
);

const contactSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
  },
  alternatePhone: {
    type: String,
  },
  email: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  emergencyContactName: { type: String },
  emergencyContactPhone: {
    type: String,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  emergencyContactRelation: { type: String },
});

patientSchema.pre("save", async function () {
  try {
    if (!this.patientId) {
      this.patientId = await generateId("PATIENT", "PAT", 5);
    }
  } catch (error) {
    throw new Error("Something went wrong!" +  error.message);
  }
});

export default mongoose.model("Patient", patientSchema);
