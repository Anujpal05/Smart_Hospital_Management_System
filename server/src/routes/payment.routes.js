import express from "express";
import {
  makePayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
} from "../controllers/payment.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

router.post("/", authenticateToken, makePayment);
router.get("/", authenticateToken, getPayments);
router.get("/:id", authenticateToken, getPaymentById);
router.put("/status/:id", authenticateToken, updatePaymentStatus);

export default router;
