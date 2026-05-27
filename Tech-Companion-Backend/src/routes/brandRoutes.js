import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from "../controllers/brandController.js";
import { protect } from "../middleware/authMiddlware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllBrands);
router.get("/:id", getBrandById);

// Admin Routes
router.post("/", protect, adminOnly, createBrand);

router.put("/:id", protect, adminOnly, updateBrand);

router.delete("/:id", protect, adminOnly, deleteBrand);

export default router;
