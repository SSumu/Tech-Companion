import express from "express";
import { protect } from "../middleware/authMiddlware.js";
import {
  changePassword,
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Protected Routes
router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

router.put("/change-password", protect, changePassword);

router.delete("/delete-account", protect, deleteUserAccount);

export default router;
