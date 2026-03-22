import express from "express";
import {
  createWard,
  getAllWards,
  getWardById,
} from "../controllers/ward.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

router.post("/", authenticateToken, createWard);
router.get("/", authenticateToken, getAllWards);
router.get("/:id", authenticateToken, getWardById);

export default router;
