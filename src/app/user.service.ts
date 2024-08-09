import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User, Profile, Roles } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  users$: Observable<User[]>;
  private basePath = '/users';

  constructor() {
    const ProfileCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(ProfileCollection) as Observable<User[]>;
  }

  getQueryRef(ref: string) {
    return collection(this.firestore, ref);
  }

  async getUser(userId: string) {
    const userDoc = doc(this.getQueryRef('users'), userId);
    const userSnap = await getDoc(userDoc);
    return userSnap.data() as User | null;
  }

  async getProfile(userId: string) {
    const ProfileDoc = doc(
      this.getQueryRef(`users/${userId}/public`),
      'profile'
    );
    const ProfileSnap = await getDoc(ProfileDoc);
    return ProfileSnap.data() as Profile | null;
  }

  async getUserRoles(userId: string): Promise<Roles | null> {
    const userRolesDoc = doc(
      this.getQueryRef(`users/${userId}/private`),
      'roles'
    );
    const userRolesSnap = await getDoc(userRolesDoc);
    return userRolesSnap.data() as Roles | null;
  }

  async checkUserRoles(userId: string, roles: string[]): Promise<boolean> {
    const userRoles = await this.getUserRoles(userId);
    if (userRoles) {
      for (const role of roles) {
        if (userRoles[role]) {
          return true;
        }
      }
    }
    return false;
  }
}
