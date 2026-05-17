import mongoose from "mongoose";
import generateId from "../utils/generateId.js";

// Sample Details
const sampleDetailsSchema = new mongoose.Schema({
  sampleId: {
    type: String,
    unique: true,
    immutable: true,
  },
  sampleType: String,
  sampleCondition: String,
  collectionDate: Date,
  collectionTime: String,
  collectedBy: String,
  collectionLocation: String,
  sampleNotes: String,
});

// Doctor Referral
const doctorReferralSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  department: String,
  hospitalName: String,
  hospitalAddress: String,
});

// Clinical Info
const clinicalInfoSchema = new mongoose.Schema({
  symptoms: String,
  diagnosis: String,
  clinicalHistory: String,
  allergies: String,
  currentMedications: String,
  pastMedicalHistory: String,
  doctorNotes: String,
});
const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true, 
  },
  publicId: {
    type: String, 
  },
  fileType: {
    type: String,
    enum: ["pdf", "image"],
    required: true,
  },
  fileName: String,
  fileSize: String, 
});
// Main Medical Report Schema
const medicalReportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      unique: true,
      immutable: true,
    },

    //  Link to patient (MOST IMPORTANT)
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    // Optional doctor
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    // Lab info
    labId: String,

    sampleDetails: [sampleDetailsSchema],

    clinicalInformation: [clinicalInfoSchema],

    doctorReferral: [doctorReferralSchema],
    files: [fileSchema],

    reportStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    remarks: String,
  },
  { timestamps: true },
);

medicalReportSchema.pre("save", async function () {
    if (!this.reportId) {
      this.reportId = await generateId("REPORT", "REPORT", 3 , true);
    }
});

sampleDetailsSchema.pre("save" , async function(){
  if(!this){
    return;
  }

  if(!this.sampleId){
    this.sampleId = await generateId("SAMPLE", "SMP", 3 , true);
  }
})

// Index for performance
medicalReportSchema.index({ patient: 1 , createdAt: -1 });

export default mongoose.model("MedicalReport", medicalReportSchema);
