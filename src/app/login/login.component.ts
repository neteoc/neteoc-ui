import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  user,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';


import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private _authService = inject(AuthService);
  user$ = user(this._authService);
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this._authService.user$.subscribe((aUser: User | null) => {
      this.isAuthenticated = this._authService.isAuthenticated$;
      if (aUser) {
        this.router.navigate(['/']);
        
      } else {
        this.isAuthenticated = false;
      }
    });
  }

}
