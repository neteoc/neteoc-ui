import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
  authState,
  user
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  redirectUrl: string | null = null;

  constructor(private _router: Router) {   }

  user$ = user(this.auth);

  logout(): Promise<void> {
    this._router.navigateByUrl('/login')
    return signOut(this.auth);
  }

  byGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  isAuthenticated$ = this.user$.pipe(map(user => !!user));

  get username(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.displayName : null;
  }

  get email(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.email : null;
  }

  get photoURL(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.photoURL : null;
  }

  get uid(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }
}
