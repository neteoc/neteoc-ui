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

import { MissionRequest } from './mission-request';

@Injectable({
  providedIn: 'root'
})
export class MissionRequestService {
  firestore: Firestore = inject(Firestore);
  private basePath = '/mission-requests';
  missionRequestCollection = collection(this.firestore, 'mission-requests');

  constructor() { }

  async addMissionRequest(missionRequest: MissionRequest) {
    try {
      const docRef = await addDoc(this.missionRequestCollection, missionRequest);
      return docRef.id;
    } catch (e) {
      console.error('Error adding mission request: ', e);
      throw new Error("Failed to add mission request");
    }
  }
}
