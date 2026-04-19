import express from "express";
import { authenticateToken } from "../config/auth.js";
import upload from "../config/multer.js";
import { addMedication } from "../controllers/medication.controller.js";
const router = express.Router();

router.post("/", authenticateToken, addMedication);
router.get("/patient-id/:id", authenticateToken  );
router.put("/:id", authenticateToken);

export default router;
