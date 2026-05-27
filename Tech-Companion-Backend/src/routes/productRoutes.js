import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddlware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createProductValidator,
  updateProductValidator,
} from "../validators/productValidator.js";

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProductValidator,
  createProduct,
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateProductValidator,
  updateProduct,
);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
