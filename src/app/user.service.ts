import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  users$: Observable<User[]>;
  private basePath: string = '/users';

  constructor() {
    const userProfileCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(userProfileCollection) as Observable<User[]>;
  }

  getQueryRef(ref: string) {
    return collection(this.firestore, ref);
  }

  async getUserPub(userId: string) {
    const docref = `users/${userId}/pubDetails`
    console.log(docref);
    const userDoc = doc(this.firestore, docref, "email");
    const userSnap = await getDoc(userDoc);
    if (!userSnap.exists()) {
      console.log('No such document!');
      return null;
    } else {
      return userSnap.data();
    }
  }
  
  async getUser(userId: string) {
    const userDoc = doc(this.getQueryRef('users'), userId);
    const userSnap = await getDoc(userDoc);
    return userSnap.data();
  }

}
