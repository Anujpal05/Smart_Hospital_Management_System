import express from "express";
import {
  createAppointment,
  getAppointmentById,
  getAppointments,
  getPatientAppointments,
  responseAppointment,
} from "../controllers/appointment.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

router.post("/create-appointment", createAppointment);
router.put("/response-appointment/:id", authenticateToken, responseAppointment);
router.get("/get-appointments/:id", authenticateToken, getAppointments);
router.get("/get-appointment/:id", authenticateToken, getAppointmentById);
router.get(
  "/get-patient-appointments/:id",
  authenticateToken,
  getPatientAppointments,
);

export default router;
