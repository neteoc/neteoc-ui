import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc
} from '@angular/fire/firestore';

import { MissionRequest } from './mission-request';

@Injectable({
  providedIn: 'root'
})
export class MissionRequestService {
  firestore: Firestore = inject(Firestore);
  private basePath = '/mission-requests';
  missionRequestCollection = collection(this.firestore, 'mission-requests');


  async addMissionRequest(missionRequest: MissionRequest) {
    try {
      const docRef = await addDoc(this.missionRequestCollection, missionRequest);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Error adding mission request: ', e);
      throw new Error("Failed to add mission request");
    }
  }
}
