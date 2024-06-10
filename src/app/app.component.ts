import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  user,
  User
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

  constructor() {

  }
  

  ngOnInit() {
    this._authService.user$.subscribe((aUser: User | null) => {
      this.isAuthenticated = this._authService.isAuthenticated$;
      if (this.isAuthenticated) {
        console.log("User is authenticated:" , aUser)
      }
    }
      
    );
    console.log("ngOnInit: " ,this.isAuthenticated)
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit: " ,this.isAuthenticated)
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit: " ,this.isAuthenticated)
  }

  ngAfterContentChecked() { 
    console.log("ngAfterContentChecked:", this.isAuthenticated)
  }
}
