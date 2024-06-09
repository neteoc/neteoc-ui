import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);

  constructor(private _router: Router) { }

  logout(): Promise<void> {
    this._router.navigateByUrl('/login')
    return signOut(this._auth);
  }

  byGoogle(): Promise<UserCredential> {
    return signInWithPopup(this._auth, new GoogleAuthProvider())
  }

  get isAuthenticated(): boolean {
    return this._auth.currentUser !== null;
  }

  get username(): string | null {
    return this._auth.currentUser ? this._auth.currentUser.displayName : null;
  }

  get email(): string | null {
    return this._auth.currentUser ? this._auth.currentUser.email : null;
  }

  get photoURL(): string | null {
    return this._auth.currentUser ? this._auth.currentUser.photoURL : null;
  }

  get uid(): string | null {
    return this._auth.currentUser ? this._auth.currentUser.uid : null;
  }
}
