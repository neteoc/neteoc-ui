import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const allowed: boolean = true; // TODO: implement authentication check here;
  return allowed || router.navigate(['unauthorized']);
};
