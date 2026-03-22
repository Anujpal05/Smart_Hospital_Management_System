import mongoose from "mongoose";
import generateId from "../utils/generateId.js";

const billItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // e.g. "Blood Test", "X-Ray", "Consultation"
  },
  category: {
    type: String,
    enum: ["Consultation", "Lab", "Medicine", "Surgery", "Room", "Other"],
  },
  amount: {
    type: Number,
    required: true,
  },
});

const billSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    items: [billItemSchema],
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Unpaid", "Partial", "Paid", "Cancelled"],
      default: "Unpaid",
    },
    billNumber: {
      type: String,
      unique: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

billSchema.pre("save", async function () {
  if (!this.billNumber) {
    try {
      this.billNumber = await generateId("BILL", "BILL", 4, true);
    } catch (error) {
      throw new Error("Failed to generate bill number: " + error.messagge);
    }
  }

  const itemTotal = this.items.reduce((sum, item) => sum + item.amount, 0);
  const discount = this.discount || 0;
  const tax = this.tax || 0;

  this.totalAmount = itemTotal + tax - discount;

  if (this.paidAmount == 0) {
    this.status = "Unpaid";
  } else if (this.paidAmount < this.totalAmount) {
    this.status = "Partial";
  } else {
    this.status = "Paid";
  }
});

export default mongoose.model("Bill", billSchema);
