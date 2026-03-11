import express from "express";
import {
  admitPatient,
  dischargePatient
} from "../controllers/admission.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

router.post("/", authenticateToken, admitPatient);
router.put("/discharge/:id", authenticateToken, dischargePatient);

export default router;
