import express from "express";
import { addDoctor, getDoctorById, getDoctors, updateDoctor } from "../controllers/doctors.controller.js";
import { authenticateToken } from "../config/auth.js";
const router = express.Router();

router.post("/add-doctor" , authenticateToken, addDoctor);
router.get("/get-doctors" ,authenticateToken, getDoctors);
router.get("/get-doctor/:id" ,authenticateToken ,  getDoctorById);
router.put("/update-doctor/:id" ,authenticateToken, updateDoctor);

export default router;