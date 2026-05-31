import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard) },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.routes').then((m) => m.ANALYTICS_ROUTES),
  },
  {
    path: 'products',
    loadComponent: () => import('./manage-products/manage-products').then((m) => m.ManageProducts),
  },
  {
    path: 'orders',
    loadComponent: () => import('./manage-orders/manage-orders').then((m) => m.ManageOrders),
  },
  {
    path: 'user',
    loadComponent: () => import('./manage-users/manage-users').then((m) => m.ManageUsers),
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics').then((m) => m.Analytics),
  },
];
