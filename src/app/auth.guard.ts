import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';



export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }
    ));
  
  // return allowed || router.navigate(['login']);
};
