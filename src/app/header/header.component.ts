import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { environment } from '../../environments/environment';

import { AuthService } from '../auth.service';

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
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  private _authService = inject(AuthService);
  title = environment.name;

  logout(): void {
    this._authService
      .logout();
  }

  byGoogle(): void {
    this._authService
      .byGoogle();
  }

  get uid(): string {
    return this._authService.uid || '';
  }

  get isAuthenticated(): boolean {
    return this._authService.isAuthenticated;
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
}
