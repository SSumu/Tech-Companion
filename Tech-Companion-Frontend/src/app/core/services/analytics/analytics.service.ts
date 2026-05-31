import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AnalyticsResponse } from '../../models/analytics.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/analytics`;

  constructor() {}

  /*
   * Dashboard analytics
   * GET /api/analytics/dashboard
   */
  getDashboardStats(): Observable<AnalyticsResponse> {
    return this.http.get<AnalyticsResponse>(`${this.apiUrl}/dashboard`);
  }

  /*
   * Revenue trend only
   * GET /api/analytics/revenue-trend
   */
  getRevenueTrend() {
    return this.http.get(`${this.apiUrl}/revenue-trend`);
  }

  /*
   * Order trend only
   * GET /api/analytics/order-trend
   */
  getOrderTrend() {
    return this.http.get(`${this.apiUrl}/order-trend`);
  }

  /*
   * Sales summary
   * GET /api/analytics/sales-summary
   */
  getSalesSummary() {
    return this.http.get(`${this.apiUrl}/sales-summary`);
  }

  /*
   * Top selling products
   * GET /api/analytics/top-products
   */
  getTopProducts(limit = 5) {
    return this.http.get(`${this.apiUrl}/top-products?limit=${limit}`);
  }

  /*
   * Analytics by date range
   * GET /api/analytics/date-range?startDate=...&endDate=...
   */
  getAnalyticsByDateRange(startDate: Date, endDate: Date) {
    return this.http.get(`${this.apiUrl}/date-range`, {
      params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
    });
  }
}
