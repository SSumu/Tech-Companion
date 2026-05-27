import express from "express";
import { protect } from "../middleware/authMiddlware.js";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { createOrderValidator } from "../validators/orderValidator.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createOrderValidator, createOrder);

router.get("/my-orders", protect, getUserOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/cancel", protect, cancelOrder);

// Admin Routes
router.get("/", protect, adminOnly, getAllOrders);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
