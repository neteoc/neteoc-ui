import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDocs,
  runTransaction,
  addDoc,
  deleteDoc,
  updateDoc,
  docData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { Mission } from './mission';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})
export class MissionService {
  firestore: Firestore = inject(Firestore);
  missions$: Observable<Mission[]>;
  private basePath: string = '/missions';
  missionCollection = collection(this.firestore, 'missions');

  constructor() {
    const missionCollection2 = this.missionCollection;
    this.missions$ = collectionData(missionCollection2, { idField: 'id' }).pipe( // Use the pipe operator
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
    const missionRef = doc(this.firestore, `${this.basePath}/${id}`);
    return docData(missionRef, { idField: 'id' }) as Observable<Mission>;
  }

  async deleteMission(missionId: string) {
    const missionRef = doc(this.firestore, `${this.basePath}/${missionId}`);
    try {
      await deleteDoc(missionRef);
      console.log("Mission successfully deleted!");
    } catch (error) {
      console.error("Error removing mission: ", error);
    }
  }

  async addMission(mission: Mission) {
    try {
      const docRef = await addDoc(this.missionCollection, mission);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error("Failed to add mission");
    }
  }

  async updateMission(missionId: string, missionData: Partial<Mission>) {
    const missionRef = doc(this.firestore, `${this.basePath}/${missionId}`);
    try {
      await updateDoc(missionRef, missionData);
      console.log("Mission successfully updated!");
    } catch (error) {
      console.error("Error updating mission: ", error);
      throw new Error("Failed to update mission");
    }
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