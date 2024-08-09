import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { user, User } from '@angular/fire/auth';
import { environment } from '../../environments/environment';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Profile } from '../user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent implements OnInit {
  // Implement OnInit interface
  private _authService = inject(AuthService);
  user$ = user(this._authService);
  userId = '';
  title = environment.name;
  isAuthenticated: boolean = this._authService.isAuthenticated$;
  userRoles: Record<string, boolean> = {};
  Profile: Profile | null = null;

  constructor(public userservice: UserService) {}

  ngOnInit(): void {
    this._authService.user$.subscribe(async (aUser: User | null) => {
      this.isAuthenticated = this._authService.isAuthenticated$;
      if (aUser) {
        console.log('User is authenticated');
        console.log(aUser);
        if (aUser) {
          this.userId = aUser.uid;
          this.Profile = await this.userservice.getProfile(aUser.uid);
          const roles = await this.userservice.getUserRoles(aUser.uid);
          this.userRoles = roles as Record<string, boolean>;
          console.log(this.userRoles);
        } else {
          this.userRoles = {};
        }
      } else {
        this.isAuthenticated = false;
      }
    });
  }
  logout(): void {
    this._authService.logout();
  }

  byGoogle(): void {
    this._authService.byGoogle();
  }

  get uid(): string {
    return this._authService.uid || '';
  }

  get username(): string {
    return this._authService.username || '';
  }

  get email(): string {
    return this._authService.email || '';
  }

  get photoURL(): string {
    return this._authService.photoURL || '';
  }

  checkRoles(roles: string[]): boolean {
    if (this.userRoles) {
      roles.push('superadmin');
      for (const role of roles) {
        if (this.userRoles[role]) {
          return true;
        }
      }
    }
    return false;
  }
}
