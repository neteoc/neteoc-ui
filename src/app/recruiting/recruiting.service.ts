import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collectionData,
  collection,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Submission } from './submission';

@Injectable({
  providedIn: 'root'
})
export class RecruitingService {
  firestore: Firestore = inject(Firestore);
  submissions$: Observable<Submission[]>;
  private basePath: string = '/recruiting';
  submissionCollection = collection(this.firestore, 'recruiting');

  constructor() { 
    this.submissions$ = collectionData(this.submissionCollection, { idField: 'id' }) as Observable<Submission[]>;
  }
}
