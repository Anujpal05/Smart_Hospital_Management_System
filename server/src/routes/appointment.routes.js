import express from "express";
import {
  createAppointment,
  getAppointmentById,
  getAppointments,
  getDoctorAppointments,
  getPatientAppointments,
  getPendingAppointments,
  responseAppointment,
} from "../controllers/appointment.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

router.post("/", authenticateToken, createAppointment);
router.get("/", authenticateToken, getAppointments);
router.get("/pending", authenticateToken, getPendingAppointments);
router.get("/doctor-id/:id", authenticateToken, getDoctorAppointments);
router.get("/patient-id/:id", authenticateToken, getPatientAppointments);
router.get("/:id", authenticateToken, getAppointmentById);
router.put("/:id", authenticateToken, responseAppointment);

export default router;
