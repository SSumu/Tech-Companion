import { getDashboardAnalytics } from "../services/analyticsService.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardAnalytics();

    res.status(200).json(data);
  } catch (error) {
    console.error("Analytics Error:", error);

    res.status(500).json({ message: "Failed to load analytics data" });
  }
};
