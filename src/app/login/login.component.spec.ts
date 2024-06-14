import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { LoginComponent } from './login.component';

import { environment } from '../../environments/environment'
import { routes } from '../app.routes';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent
      ],
      providers: [
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
