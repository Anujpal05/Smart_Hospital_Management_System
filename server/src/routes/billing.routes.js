import express from "express";
import {
  createBill,
  getBillById,
  getBills,
} from "../controllers/billing.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

router.post("/", authenticateToken, createBill);
router.get("/", authenticateToken, getBills);
router.get("/:id", authenticateToken, getBillById);

export default router;
