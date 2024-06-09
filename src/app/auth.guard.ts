import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  const allowed: boolean = authService.isAuthenticated;
  
  return allowed || router.navigate(['login']);
};
