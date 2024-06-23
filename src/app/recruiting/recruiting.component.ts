import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { RecruitingService } from './recruiting.service';
import { Submission } from './submission';

// Define an interface for the timestamp
interface Timestamp {
  seconds: number;
}

// Use 'unknown' instead of 'any' and perform runtime type checks
function isTimestampWithSeconds(timestamp: unknown): timestamp is Timestamp {
  return (
    typeof timestamp === 'object' &&
    timestamp !== null &&
    'seconds' in timestamp
  );
}

@Component({
  selector: 'app-recruiting',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
  ],
  templateUrl: './recruiting.component.html',
  styleUrls: ['./recruiting.component.scss'],
})
export class RecruitingComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'fname', 'status'];
  dataSource = new MatTableDataSource<Submission>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private recruitingService: RecruitingService) {}

  ngOnInit() {
    this.recruitingService.submissions$.subscribe((submissions) => {
      this.dataSource = new MatTableDataSource(submissions);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (
        item: Submission,
        property: string
      ): string | number => {
        switch (property) {
          case 'timestamp': {
            if (isTimestampWithSeconds(item.timestamp)) {
              return new Date(item.timestamp.seconds * 1000).getTime();
            } else if (typeof item.timestamp === 'number') {
              return item.timestamp;
            }
            return 0;
          }
          case 'name': {
            return `${item.fname} ${item.lname}`;
          }
          default: {
            const value = item[property as keyof Submission];
            return typeof value === 'string' || typeof value === 'number'
              ? value
              : '';
          }
        }
      };
    });
  }
}
