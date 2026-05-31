import express from "express";
import { protect } from "../middleware/authMiddlware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getDashboard } from "../controllers/analyticsController.js";

const router = express.Router();

// Admin only analytics dashboard
router.get("/dashboard", protect, adminOnly, getDashboard);

export default router;
