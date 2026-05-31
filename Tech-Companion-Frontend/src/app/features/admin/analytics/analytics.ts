import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../../core/services/analytics/analytics.service';
import { AnalyticsResponse } from '../../../core/models/analytics.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {
  private analyticsService = inject(AnalyticsService);

  loading = false;
  error = '';

  analytics: AnalyticsResponse | null = null;

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.error = '';

    this.analyticsService.getDashboardStats().subscribe({
      next: (response) => {
        this.analytics = response;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load analytics data.';
        this.loading = false;
      },
    });
  }

  getRevenueBarHeight(value: number): number {
    if (!this.analytics?.revenueTrend.length) return 0;

    const maxRevenue = Math.max(...this.analytics.revenueTrend.map((item) => item.value));

    return (value / maxRevenue) * 200;
  }

  getOrderBarHeight(value: number): number {
    if (!this.analytics?.orderTrend.length) return 0;

    const maxOrders = Math.max(...this.analytics.orderTrend.map((item) => item.value));

    return (value / maxOrders) * 200;
  }
}
