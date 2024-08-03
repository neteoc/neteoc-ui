import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User, UserProfile } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  users$: Observable<User[]>;
  private basePath = '/users';

  constructor() {
    const userProfileCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(userProfileCollection) as Observable<User[]>;
  }

  getQueryRef(ref: string) {
    return collection(this.firestore, ref);
  }
  
  async getUser(userId: string) {
    const userDoc = doc(this.getQueryRef('users'), userId);
    const userSnap = await getDoc(userDoc);
    return userSnap.data() as User | null;
  }

  async getUserProfile(userId: string) {
    const userProfileDoc = doc(this.getQueryRef(`users/${userId}/public`), 'profile');
    const userProfileSnap = await getDoc(userProfileDoc);
    return userProfileSnap.data() as UserProfile | null;
  }

  async getUserRoles(userId: string) {
    const userRolesDoc = doc(this.getQueryRef(`users/${userId}/private`), 'roles');
    const userRolesSnap = await getDoc(userRolesDoc);
    return userRolesSnap.data() as object | null;
  }

}
