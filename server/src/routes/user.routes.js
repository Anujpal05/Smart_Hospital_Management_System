import express from "express";
import {
  getAllUsers,
  getUserById,
  getUsersByRole,
  updateUser,
  updatePassword,
  deactivateUser,
  activateUser,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../config/auth.js";

const router = express.Router();

// Admin only
router.get("/get-all-users", authenticateToken, getAllUsers);

// Get by role
router.get("/role", authenticateToken, getUsersByRole);

// Get single user
router.get("/get-user/:id", authenticateToken, getUserById);

// Update profile
router.put("/update-user/:id", authenticateToken, updateUser);

// Update password
router.put("/update-password/:id", authenticateToken, updatePassword);

// Soft delete
router.put("/deactivate/:id", authenticateToken, deactivateUser);

// Reactivate
router.put("/activate/:id", authenticateToken, activateUser);

export default router;
