import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Must be logged in first
  if (!authService.isLoggedIn()) {
    router.createUrlTree(['api/auth/login'], { queryParams: { returnURL: state.url } });
    return false;
  }

  // Check role
  const role = authService.getUserRole(); // e.g. 'admin', 'user'

  if (role === 'admin') return true;

  // Not authorized → redirect
  router.createUrlTree(['/not-found']); // or /unauthorized if you create it
  return false;
};
