import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MatTableModule } from '@angular/material/table';
import { Observable, from } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


import { MissionRequestService } from '../mission-request.service';
import { AuthService } from '../../auth.service';

import { MissionRequest } from '../mission-request';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: string[] = ['name', 'description', 'location', 'submittedDate'];
  @Input() displayHeaders = true;
  @Input() type!: string;
  displayTable: boolean = false;

  displayedMissionRequests: Observable<MissionRequest[]> | null;
  userID: string | null = this.authService.uid;

  constructor(
    private missionRequestService: MissionRequestService,
    private authService: AuthService
  ) {
    this.displayedMissionRequests = null;
  }

  ngOnInit() {
    try {
      this.displayedMissionRequests = from(this.missionRequestService.getMissionRequestList(this.type, this.userID!));
      this.displayedMissionRequests.subscribe(data => 
      {
        console.log(data);
        if (data.length > 0) {
          this.displayTable = true;
        }
      
      }
      ); // Add this line
    }
    catch (e) {
      console.error('Error fetching mission requests:', e);
      throw new Error("Failed to fetch mission requests");
    }
  }
  
}
