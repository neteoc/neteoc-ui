import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { environment } from '../../environments/environment';
import { routes } from '../app.routes';

import { MissionRequestComponent } from './mission-request.component';

describe('MissionRequestComponent', () => {
  let component: MissionRequestComponent;
  let fixture: ComponentFixture<MissionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MissionRequestComponent,
      ],
      providers: [
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
