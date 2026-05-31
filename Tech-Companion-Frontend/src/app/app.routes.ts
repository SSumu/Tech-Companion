import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';
import { adminGuard } from './core/guards/admin/admin-guard';

export const routes: Routes = [
  // Home
  { path: '', loadComponent: () => import('./features/home/home').then((m) => m.Home) },

  // Auth
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // Products
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then((m) => m.PRODUCT_ROUTES),
  },

  // Cart
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.routes').then((m) => m.CART_ROUTES),
    canActivate: [authGuard],
  },

  // Orders
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.routes').then((m) => m.ORDER_ROUTES),
  },

  // Admin
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canActivate: [authGuard, adminGuard],
  },

  // 404
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
