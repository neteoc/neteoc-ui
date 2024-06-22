import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../../environments/environment'

import { RecruitingService } from './recruiting.service';

describe('RecruitingService', () => {
  let service: RecruitingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecruitingService,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(RecruitingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
