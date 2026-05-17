import express from "express";
import {
  addPatient,
  deletePatient,
  getPatientById,
  getPatientByuserId,
  getPatients,
  getPatientsByDoctor,
  totalPatients,
  updatePatient,

} from "../controllers/patient.controller.js";
import { authenticateToken } from "../config/auth.js";
import upload from "../config/multer.js";
const router = express.Router();

router.get("/total-patients", authenticateToken, totalPatients);
router.post("/add-patient/", authenticateToken, upload.single("profile"), addPatient);
router.get("/", authenticateToken, getPatients);
router.get("/doctorid/:id", authenticateToken, getPatientsByDoctor);
router.get("/userid/:id", authenticateToken, getPatientByuserId);
router.get("/:id", authenticateToken, getPatientById);
router.put("/:id", authenticateToken, upload.single("profile"), updatePatient);
router.delete("/:id", authenticateToken, deletePatient);

export default router;
