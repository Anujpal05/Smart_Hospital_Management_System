import mongoose from "mongoose";

const wardSchema = new mongoose.Schema(
  {
    wardName: { type: String, required: true },
    wardType: {
      type: String,
      enum: ["ICU", "GENERAL", "PRIVATE", "EMERGENCY"],
      required: true,
    },
    totalBeds: { type: Number, default: 0 },
    beds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bed" }],
    floor: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Ward", wardSchema);
