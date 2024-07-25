import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
  user
} from '@angular/fire/auth';

const MicrosoftAuthProvider = new OAuthProvider('microsoft.com');
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


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

  byMicrosoft(): Promise<UserCredential> {
    return signInWithPopup(this.auth, MicrosoftAuthProvider);
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
