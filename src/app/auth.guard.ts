import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { user } from '@angular/fire/auth';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router: Router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      } else {
        const uid = authService.uid;
        if (uid) {
          return userService.getUser(uid).then(user => {
            if (user?.approved) {
              console.log('User is approved');
              return true;
            } else {
              console.log('User is not approved');
              router.navigate(['/profile']);
              return false;
            }
          });
        } else {
          console.log('UID is null');
          router.navigate(['/login']);
          return false;
        }
      }
    })
  );
};