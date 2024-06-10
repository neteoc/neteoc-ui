import { Component, inject, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { Mission } from '../mission';

import { MissionService } from '../mission.service';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.less'
})
export class MissionlistComponent {
  @Input() displayedColumns: string[] = ['title', 'action'];
  missions: Observable<Mission[]>;
  

  constructor(private missionService: MissionService) {
    this.missions = missionService.getMissionList();
  }

}
