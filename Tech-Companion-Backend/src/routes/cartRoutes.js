import express from "express";
import { protect } from "../middleware/authMiddlware.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

// Protected Routes
// Get User Cart
router.get("/", protect, getCart);

// Add Product To Cart
router.post("/", protect, addToCart);

// Update Cart Item Quantity
router.put("/:productId", protect, updateCartItem);

// Remove Single Item From Cart
router.delete("/:productId", protect, removeCartItem);

// Clear Entire Cart
router.delete("/", protect, clearCart);

export default router;
