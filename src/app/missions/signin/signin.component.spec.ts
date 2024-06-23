import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { provideRouter } from '@angular/router';
import { SigninComponent } from './signin.component';
import { environment } from '../../../environments/environment'
import { routes } from '../../app.routes';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,
      ],
      providers: [
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        { provide: DIALOG_DATA, useValue: { missionID: '1', userID: '1' } },
        {
          provide: DialogRef, useValue: {
        } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Additional tests...
});