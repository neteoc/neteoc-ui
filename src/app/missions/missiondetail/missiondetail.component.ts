import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Mission } from '../mission';

@Component({
  selector: 'app-missiondetail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './missiondetail.component.html',
  styleUrl: './missiondetail.component.less'
})
export class MissiondetailComponent implements OnInit {
  mission$: Observable<Mission>;
  firestore: Firestore = inject(Firestore);
  private route: ActivatedRoute = inject(ActivatedRoute);
  
  constructor() {
    // Initialize the mission Observable
    this.mission$ = this.route.paramMap.pipe(
      switchMap(params => {
        // Get the mission ID from the route parameters
        const missionId = params.get('id');
        if (!missionId) {
          throw new Error('Mission ID not found in route parameters.');
        }
        // Use the mission ID to query Firestore
        const missionDocRef = doc(this.firestore, `missions/${missionId}`);
        return docData(missionDocRef, { idField: 'id' }) as Observable<Mission>;
      })
    );
  }

  goBack() {
    // Navigate back to the previous page
    window.history.back();
  }

  ngOnInit(): void {
    // ngOnInit remains empty as the logic is handled in the constructor
  }
}