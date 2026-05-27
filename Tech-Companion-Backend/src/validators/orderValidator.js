import { body, param } from "express-validator";

export const createOrderValidator = [
  body("shippingAddress")
    .trim()
    .notEmpty()
    .withMessage("Shipping address is required"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required"),

  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("Order items are required"),

  body("orderItems.*.product")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("orderItems.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("totalAmount")
    .notEmpty()
    .withMessage("Total amount is required")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be positive"),
];

export const updateOrderStatusValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),

  body("status")
    .notEmpty()
    .withMessage("Order status is required")
    .isIn(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])
    .withMessage("Invalid order status"),
];

export const orderIdValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),
];
