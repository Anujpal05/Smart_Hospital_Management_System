import express from "express";
import {
  createBed,
  getAllBeds,
  getBedById,
  updateBedStatus,
} from "../controllers/bed.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

router.post("/", authenticateToken, createBed);
router.get("/", authenticateToken, getAllBeds);
router.get("/:id", authenticateToken, getBedById);
router.put("/:id", authenticateToken, updateBedStatus);

export default router;
