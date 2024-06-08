import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { Observable, from } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { Mission } from './mission';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.less'
})
export class MissionsComponent {
  missions: Observable<Mission[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {
    const missionCollection = collection(this.firestore, 'missions');
    this.missions = collectionData(missionCollection, { idField: 'id' }) as Observable<Mission[]>;
  }
}
