import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },

    specialization: [String],
    experience: { type: Number, min: 0, max: 70 },
    qualification: String,
    hospitalName: String,
    licenseNumber: { type: String, unique: true, immutable: true },

    consultationFee: Number,

    availableDays: [String],

    availableTime: {
      start: String,
      end: String,
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

export default mongoose.model("Doctor", doctorSchema);
