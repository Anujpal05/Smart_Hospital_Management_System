import mongoose from "mongoose";
import Bed from "./bed.model.js";

const admissionSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    ward: { type: mongoose.Schema.Types.ObjectId, ref: "Ward" },
    bed: { type: mongoose.Schema.Types.ObjectId, ref: "Bed" },
    admissionDate: { type: Date, default: Date.now },
    dischargeDate: Date,
    status: {
      type: String,
      enum: ["ADMITTED", "DISCHARGED"],
      default: "ADMITTED",
    },
  },
  { timestamps: true },
);

admissionSchema.pre("save", async function () {
  if (!this.isModified("status") && !this.isModified("bed")) return;

  // ADMIT
  if (this.status === "ADMITTED" && this.bed) {
    const bed = await Bed.findOneAndUpdate(
      { _id: this.bed, status: "AVAILABLE" },
      {
        status: "OCCUPIED",
        assignedPatient: this.patient,
      },
      { new: true }
    );

    if (!bed) {
      throw new Error("Bed already occupied or not found");
    }
  }

  // DISCHARGE
  if (this.status === "DISCHARGED" && this.bed) {
    await Bed.findOneAndUpdate(
      { _id: this.bed, assignedPatient: this.patient },
      {
        status: "AVAILABLE",
        assignedPatient: null,
      }
    );
  }
});

export default mongoose.model("Admission", admissionSchema);
