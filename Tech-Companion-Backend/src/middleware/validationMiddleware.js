import { validationResult } from "express-validator";

/**
 * Validation Middleware
 * ----------------------
 * Checks validation errors from express-validator.
 * If validation errors exist, returns a 400 response.
 * Otherwise proceeds to the next middleware/controller.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  // If no validation errors, continue
  if (errors.isEmpty()) return next();

  // Format validation errors
  const formattedErrors = errors
    .array()
    .map((error) => ({ field: error.path, message: error.msg }));

  return res
    .status(400)
    .json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
};
