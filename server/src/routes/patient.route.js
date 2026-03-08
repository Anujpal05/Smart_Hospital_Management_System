import express from "express";
import { addPatient, deletePatient, getPatientById, getPatients, updatePatient } from "../controllers/patient.controller";
const router = express.Router();

router.post("/add-patient" , addPatient);
router.get("/get-patients" , getPatients);
router.get("/get-patient/:id" , getPatientById);
router.put("/update-patient/:id" , updatePatient);
router.delete("/delete-patient/:id" , deletePatient);

export default router;