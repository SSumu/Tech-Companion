export interface TrendData {
  date: string;
  value: number;
}

export interface AnalyticsStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export interface AnalyticsResponse {
  stats: AnalyticsStats;
  revenueTrend: TrendData[];
  orderTrend: TrendData[];
}
