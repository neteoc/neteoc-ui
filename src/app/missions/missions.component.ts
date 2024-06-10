import { Component, inject, viewChild, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'; // Add this line
import { MatIconModule } from '@angular/material/icon';

import { Mission } from './mission';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MatSort } from '@angular/material/sort';
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
export class MissionsComponent implements AfterViewInit {





  constructor(private afs: Firestore, public dialog: MatDialog) {

  }

  ngAfterViewInit() {

  }
}
