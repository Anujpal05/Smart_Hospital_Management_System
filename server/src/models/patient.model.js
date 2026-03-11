import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    age: { type: Number, required: true, min: 0, max: 130 },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergencyContactName: { type: String },
    emergencyContactPhone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    emergencyContactRelation: { type: String },
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

export default mongoose.model("Patient", patientSchema);
