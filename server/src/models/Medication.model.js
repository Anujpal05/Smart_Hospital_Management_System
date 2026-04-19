import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    patientId: {
		  type: mongoose.Schema.Types.ObjectId,
		  ref: "Patient",
		  required: true,
		},
    doctor: {
          type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
     },

    medicationName: {
      type: String,
      required: true,
      trim: true,
    },

    doseAmount: {
      type: Number,
      required: true, // e.g. 1, 2
    },

    doseUnit: {
      type: String,
      enum: ["tablet", "capsule", "ml", "mg", "drop", "puff"],
      default: "tablet",
    },

    strength: {
      type: String, // e.g. "500mg"
    },

    route: {
      type: String,
      enum: ["oral", "iv", "im", "topical", "inhalation"],
      default: "oral",
    },

    frequency: {
      type: String,
      enum: [
        "once daily (OD)",
        "twice daily (BD)",
        "thrice daily (TID)",
        "four times daily (QID)",
        "as needed (SOS)",
      ],
      required: true,
    },

    specialInstructions: {
      type: String,
      trim: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    durationInDays: {
      type: Number,
    },

    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    status: {
      type: String,
      enum: ["active", "completed", "stopped"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medication", medicationSchema);