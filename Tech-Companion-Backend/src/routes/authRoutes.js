import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/authValidator.js";
import { validate } from "../middleware/validationMiddleware.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Public Routes
router.post("/register", registerValidator, validate, register);

router.post("/login", loginValidator, validate, login);

export default router;
