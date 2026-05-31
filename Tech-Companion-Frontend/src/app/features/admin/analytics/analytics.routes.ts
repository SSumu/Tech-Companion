import { Routes } from '@angular/router';

export const ANALYTICS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./analytics').then((m) => m.Analytics) },
];
