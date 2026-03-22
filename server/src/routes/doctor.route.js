import express from "express";
import {
  addDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
} from "../controllers/doctors.controller.js";
import { authenticateToken } from "../config/auth.js";
import upload from "../config/multer.js";
const router = express.Router();

router.post("/", authenticateToken, upload.single("profile"), addDoctor);
router.get("/", authenticateToken, getDoctors);
router.get("/:id", authenticateToken, getDoctorById);
router.put("/:id", authenticateToken, upload.single("profile"), updateDoctor);

export default router;
