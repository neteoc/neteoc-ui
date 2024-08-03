import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TableComponent } from './table/table.component';
@Component({
  selector: 'app-mission-request',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TableComponent
  ],
  templateUrl: './mission-request.component.html',
  styleUrl: './mission-request.component.scss'
})
export class MissionRequestComponent {

  constructor() {
  }

}
