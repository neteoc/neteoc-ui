import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';

import { MissionRequest } from './mission';

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

  async getUserSubmittedMissionRequests(userId: string): Promise<MissionRequest[]> {
    const q = query(this.missionRequestCollection, where('submittedBy', '==', userId));
    const querySnapshot = await getDocs(q);
    const missionRequests: MissionRequest[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MissionRequest;
      const missionRequestWithId = { ...data, id: doc.id };
      missionRequests.push(missionRequestWithId);
    });
    
    return missionRequests;
  }

  async getOwnedMissionRequests(userId: string): Promise<MissionRequest[]> {
    const q = query(this.missionRequestCollection, where('ownedBy', '==', userId));
    const querySnapshot = await getDocs(q);
    const missionRequests: MissionRequest[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MissionRequest;
      const missionRequestWithId = { ...data, id: doc.id };
      missionRequests.push(missionRequestWithId);
    });
    
    return missionRequests;
  }

  async getAllMissionRequestList(): Promise<MissionRequest[]> {
    try {
      const querySnapshot = await getDocs(this.missionRequestCollection);
      const missionRequests: MissionRequest[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as MissionRequest;
        const missionRequestWithId = { ...data, id: doc.id };
        missionRequests.push(missionRequestWithId);
      });
      
      return missionRequests;
    } catch (e) {
      console.error('Error fetching mission requests:', e);
      throw new Error("Failed to fetch mission requests");
    }
  }

  async getMissionRequestList(type: string, userID: string): Promise<MissionRequest[]> {
    if (type == 'owned') {
      return this.getOwnedMissionRequests(userID);
    }
    if (type == 'submitted') {
      return this.getUserSubmittedMissionRequests(userID);
    }
    if (type == 'all') {
      return this.getAllMissionRequestList();
    }
    else {
      throw new Error("Invalid type");
    }
  }

  async getMissionRequestById(id: string): Promise<MissionRequest | null> {
    try {
      const docRef = doc(this.firestore, `${this.basePath}/${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as MissionRequest;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (e) {
      console.error('Error fetching mission request:', e);
      throw new Error("Failed to fetch mission request");
    }
  }
}