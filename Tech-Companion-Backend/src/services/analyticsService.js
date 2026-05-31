import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getDashboardAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();

  const getRevenueTrend = async () => {
    return await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  };

  const getOrderTrend = async () => {
    return await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  };

  const revenueAgg = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
  ]);

  const revenueTrendRaw = await getRevenueTrend();
  const orderTrendRaw = await getOrderTrend();

  return {
    stats: {
      totalUsers,
      totalOrders,
      totalRevenue: revenueAgg[0]?.totalRevenue || 0,
      totalProducts,
    },

    // transform for frontend
    revenueTrend: revenueTrendRaw.map((item) => ({
      date: item._id,
      value: item.revenue,
    })),

    orderTrend: orderTrendRaw.map((item) => ({
      date: item._id,
      value: item.orders,
    })),
  };
};
