import express from "express";
import {
  getAllUsers,
  getUserById,
  getUsersByRole,
  updateUser,
  updatePassword,
  deactivateUser,
  activateUser,
  verifyMail,
  sendVerificationLink,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

// Admin only
router.get("/", authenticateToken, getAllUsers);

// Get by role
router.get("/role", authenticateToken, getUsersByRole);

// Update password
router.put("/password/:id", authenticateToken, updatePassword);
// Soft delete
router.put("/deactivate/:id", authenticateToken, deactivateUser);

// Reactivate
router.put("/activate/:id", authenticateToken, activateUser);

// Send verification link
router.post("/send-verification/:id" ,authenticateToken, sendVerificationLink)

//verify Email by link
router.get("/verify" , verifyMail)

// Update profile
router.put("/:id", authenticateToken, updateUser);

// Get single user
router.get("/:id", authenticateToken, getUserById);

export default router;
