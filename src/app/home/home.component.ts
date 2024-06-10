import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MissionlistComponent } from '../missions/missionlist/missionlist.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MissionlistComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  

}
