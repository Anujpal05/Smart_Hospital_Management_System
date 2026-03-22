import mongoose from "mongoose";
import generateId from "../utils/generateId.js";

const paymentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    paymentId: {
      type: String,
      unique: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    method: {
      type: String,
      enum: ["CASH", "CARD", "UPI", "NETBANKING"],
      default: "CASH",
    },
    transactionId: String,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

paymentSchema.pre("save", async function () {
  try {
    if (!this.paymentId) {
      this.paymentId = await generateId("PAYMENT", "PAY", 4, true);
    }
  } catch (error) {
    throw new Error("Something went wrong!" + error.message);
  }
});

export default mongoose.model("Payment", paymentSchema);
