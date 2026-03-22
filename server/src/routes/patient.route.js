import express from "express";
import {
  addPatient,
  deletePatient,
  getPatientById,
  getPatients,
  getPatientsByDoctor,
  totalPatients,
  updatePatient,
} from "../controllers/patient.controller.js";
import { authenticateToken } from "../config/auth.js";
import upload from "../config/multer.js";
const router = express.Router();

router.get("/total-patients", authenticateToken, totalPatients);
router.post("/", authenticateToken, upload.single("profile"), addPatient);
router.get("/", authenticateToken, getPatients);
router.get("/doctorid/:id", authenticateToken, getPatientsByDoctor);
router.get("/:id", authenticateToken, getPatientById);
router.put("/:id", authenticateToken, upload.single("profile"), updatePatient);
router.delete("/:id", authenticateToken, deletePatient);

export default router;
