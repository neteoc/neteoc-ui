import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDocs,
  runTransaction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

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
    this.missions$ = collectionData(missionCollection, { idField: 'id' }).pipe( // Use the pipe operator
      map((missions: Mission[]) => missions) // Transform the Observable<Mission[]> into Observable<any[]>
    );
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

  async signIntoMission(missionId: string, userId: string, Latitude: number, Longitude: number) {
    const missionRef = doc(this.firestore, `${this.basePath}/${missionId}`);
    await runTransaction(this.firestore, async (transaction) => {
      const missionDoc = await transaction.get(missionRef);
      if (!missionDoc.exists()) {
        throw new Error("Mission does not exist!");
      }
      const missionData = missionDoc.data() as Mission;
      // Check if the user is already in the roster to avoid duplicates
      const isUserInRoster = missionData.roster?.some(rosterEntry => rosterEntry.userId === userId);
      if (!isUserInRoster) {
        const newUserRosterEntry = {
          userId: userId,
          location: {
            Latitude: Latitude,
            Longitude: Longitude,
          },
        };
        const updatedRoster = [...missionData.roster, newUserRosterEntry];
        // Update the mission document with the new roster
        transaction.update(missionRef, { roster: updatedRoster });
      }
    });
  }
}