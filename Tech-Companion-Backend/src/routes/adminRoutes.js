import express from "express";
import { protect } from "../middleware/authMiddlware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  getDashboardStats,
  getSalesAnalytics,
  getUserById,
  updateUserRole,
} from "../controllers/adminController.js";

const router = express.Router();

// All Admin Routes Protected
router.use(protect, adminOnly);

// Dashboard
router.get("/dashboard", getDashboardStats);

// Users
router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.put("/users/:id/role", updateUserRole);

router.delete("/users/:id", deleteUser);

// Analytics
router.get("/analytics/sales", getSalesAnalytics);

export default router;
