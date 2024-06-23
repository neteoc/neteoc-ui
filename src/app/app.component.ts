import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  user
} from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    DragDropModule,
    HeaderComponent,
    MainmenuComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  private _authService = inject(AuthService);
  title = environment.name;
  user$ = user(this._authService);

  isAuthenticated: boolean = this._authService.isAuthenticated$;
 

  ngOnInit() {
    this.isAuthenticated = this._authService.isAuthenticated$;
  }


}
