import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';


import { MissionRequestService } from './mission-request.service';

describe('MissionRequestService', () => {
  let service: MissionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MissionRequestService,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(MissionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
