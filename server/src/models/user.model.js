import mongoose from "mongoose";
import generateId from "../utils/generateId.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, unique: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email format!",
      },
      unique: true,
      immutable: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "ADMIN"],
      default: "PATIENT",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    tokenExpiry: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  try {
    if (!this.userId) {
      this.userId = await generateId("USER", "USER", 5);
    }
  } catch (error) {
    throw new Error("Something went wrong!" + error.message);
  }
});

export default mongoose.model("User", userSchema);
