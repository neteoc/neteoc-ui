import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';


import { MissionlistComponent } from './missionlist/missionlist.component';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MissionlistComponent
  ],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.less'
})
export class MissionsComponent {





  constructor(
    public dialog: MatDialog
  ) {

  }

}
