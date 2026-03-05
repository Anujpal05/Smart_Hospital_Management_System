import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import wardRoutes from "./src/routes/ward.routes.js";
import bedRoutes from "./src/routes/bed.routes.js";
import appointmentRoutes from "./src/routes/appointment.routes.js";
import admissionRoutes from "./src/routes/admission.routes.js";
import billingRoutes from "./src/routes/billing.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";

// Load env
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wards", wardRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/bills", billingRoutes);
app.use("/api/payments", paymentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🏥 Smart Hospital API Running...");
  console.log("🏥 Smart Hospital API Running on port 5000...");
});

const PORT = process.env.PORT || 5000;

// Connect DB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
