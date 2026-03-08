import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialization: [String],
    experience: Number,
    qualification: String,
    hospitalName: String,
    licenseNumber: String,

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
