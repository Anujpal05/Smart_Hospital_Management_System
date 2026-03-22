import express from "express";
import { authenticateToken } from "../config/auth.js";
import { createMedicalReport, deleteALLMedicalReports, deleteMedicalReport, getMedicalReportById, getMedicalReportByPatientId, getMedicalReports, updateMedicalReport } from "../controllers/medicalReport.controller.js";
const router = express.Router();

router.post("/" , authenticateToken,  createMedicalReport)
router.get("/" , authenticateToken,  getMedicalReports)
router.get("/patient-id/:id" , authenticateToken,  getMedicalReportByPatientId)
router.get("/:id" , authenticateToken,  getMedicalReportById)
router.put("/:id" , authenticateToken,  updateMedicalReport)
router.delete("/delete-all" , deleteALLMedicalReports)
router.delete("/:id" , authenticateToken,  deleteMedicalReport)

export default router;
