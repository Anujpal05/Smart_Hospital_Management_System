import express from "express";
import { addPatient, deletePatient, getPatientById, getPatients, totalPatients, updatePatient } from "../controllers/patient.controller.js";
import { authenticateToken } from "../config/auth.js";
const router = express.Router();

router.post("/add-patient" , authenticateToken, addPatient);
router.get("/get-patients" , authenticateToken, getPatients);
router.get("/get-patient/:id" ,authenticateToken, getPatientById);
router.put("/update-patient/:id" ,authenticateToken, updatePatient);
router.delete("/delete-patient/:id" ,authenticateToken, deletePatient);
router.get("/total-patients" , authenticateToken, totalPatients)

export default router;