import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment'
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(environment.firebase)), 
      ],
      imports: [
        
      ]

    });
    service = TestBed.inject(AuthService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
