import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");

  return users;
};

export const getUserByIdService = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) throw new Error("User not found");

  return user;
};

export const updateUserRoleService = async (userId, role) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) throw new Error("User not found");

  return user;
};

export const getDashboardStatsService = async () => {
  const totalUsers = await User.countDocuments();

  const totalProducts = await Product.countDocuments();

  const totalOrders = await Order.countDocuments();

  const totalSalesResult = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
  ]);

  const totalSales =
    totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

  return { totalUsers, totalProducts, totalOrders, totalSales };
};

export const getSalesAnalyticsService = async () => {
  const analytics = await Order.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        totalSales: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  return analytics;
};
