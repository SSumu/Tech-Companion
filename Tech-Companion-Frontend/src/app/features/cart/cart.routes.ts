import { Routes } from '@angular/router';

export const CART_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./cart-item/cart-item').then((m) => m.CartItem) },
  { path: 'checkout', loadComponent: () => import('./checkout/checkout').then((m) => m.Checkout) },
];
