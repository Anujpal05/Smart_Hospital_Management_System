import mongoose from "mongoose";

const bedSchema = new mongoose.Schema(
  {
    bedNumber: { type: String, required: true },
    ward: { type: mongoose.Schema.Types.ObjectId, ref: "Ward" },
    status: {
      type: String,
      enum: ["AVAILABLE", "OCCUPIED", "MAINTENANCE"],
      default: "AVAILABLE",
    },
    assignedPatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Bed", bedSchema);
