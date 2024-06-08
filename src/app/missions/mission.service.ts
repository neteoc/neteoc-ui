import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDocs
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Mission } from './mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  firestore: Firestore = inject(Firestore);
  missions$: Observable<Mission[]>;
  private basePath: string = '/missions';

  constructor() {
    const missionCollection = collection(this.firestore, 'missions');
    this.missions$ = collectionData(missionCollection) as Observable<Mission[]>;
  }

  getMissionList() {

    return this.missions$;
  }

  getMissions = async () => {
    const snapshot = await getDocs(collection(this.firestore, 'missions'));
    const missions: Mission[] = snapshot.docs.map(doc => ({
      id: doc.id, // Explicitly set the id here
      ...doc.data() as Mission // Assumes the rest of the fields match the Mission interface
    }));
    return missions;
  };

  getMission(id: string) {
    return doc(this.firestore, `${this.basePath}/${id}`);
  }
  

}
