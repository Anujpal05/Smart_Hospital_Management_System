import mongoose from "mongoose";
import Doctor from "./doctor.model.js";
import Patient from "./patient.model.js";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    date: { type: Date, required: true },
    timeslot: String,
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
    reason: String,
  },
  { timestamps: true },
);

appointmentSchema.post("save", async function (doc) {
  if (!doc.doctor || !doc.patient) return;

  if (doc.status === "CONFIRMED") {
    await Doctor.findByIdAndUpdate(doc.doctor, {
      $addToSet: { assignedPatients: doc.patient },
    });
  }

  await Patient.findByIdAndUpdate(doc.patient, {
    $addToSet: { appointments: doc._id },
  });
});

export default mongoose.model("Appointment", appointmentSchema);
