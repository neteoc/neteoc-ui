import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  GithubAuthProvider
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
  title = environment.name;
}
