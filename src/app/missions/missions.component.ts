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
    MatIconModule
  ],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.less'
})
export class MissionsComponent implements AfterViewInit {
  missions: Observable<Mission[]>;
  firestore: Firestore = inject(Firestore);

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['title', 'description', 'location', 'action'];
  @ViewChild(MatSort) sort!: MatSort;




  constructor(private afs: Firestore, public dialog: MatDialog) {
    const missionCollection = collection(this.firestore, 'missions');
    this.missions = collectionData(missionCollection, { idField: 'id' }).pipe( // Use the pipe operator
      map((missions: Mission[]) => missions) // Transform the Observable<Mission[]> into Observable<any[]>
    );
  }

  ngAfterViewInit() {
    this.missions.subscribe(data => { // Subscribe to the transformed Observable
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }
}
