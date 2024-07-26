import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  user,
  User
} from '@angular/fire/auth';
import { environment } from '../../environments/environment';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { UserProfile } from '../user';


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
export class HeaderComponent implements OnInit { // Implement OnInit interface
  private _authService = inject(AuthService);
  user$ = user(this._authService);
  userId: string = '';
  title = environment.name;
  isAuthenticated: boolean = this._authService.isAuthenticated$;
  userRoles: { [key: string]: boolean } = {}; 
  userProfile: UserProfile | null = null;


  constructor(
    public userservice: UserService
  ) {}

  ngOnInit(): void {
    this._authService.user$.subscribe(async (aUser: User | null) => {
      this.isAuthenticated = this._authService.isAuthenticated$;
      if (aUser) {
        console.log('User is authenticated');
        console.log(aUser);
        if (aUser) {
          this.userId = aUser.uid;
          this.userProfile = await this.userservice.getUserProfile(aUser.uid);
          const roles = await this.userservice.getUserRoles(aUser.uid);
          this.userRoles = roles as { [key: string]: boolean };
          console.log(this.userRoles);
        } else {
          this.userRoles = {};
        }
        
      } else {
        this.isAuthenticated = false;
      }
    }
      
    );
    
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
      for (let role of roles) {
        if (this.userRoles[role]) {
          return true;
        }
      }
    }
    return false;
  }

}
