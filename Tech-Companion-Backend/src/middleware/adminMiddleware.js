/**
 * @desc    Middleware to allow only admins
 */
export const adminOnly = (req, res, next) => {
  try {
    // Check authenticated user
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. Please login first" });
    }

    // Check admin role
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admin only" });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
