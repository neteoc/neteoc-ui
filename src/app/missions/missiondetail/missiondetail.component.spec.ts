import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../../../environments/environment'
import { routes } from '../../app.routes';

import { MissiondetailComponent } from './missiondetail.component';

describe('MissiondetailComponent', () => {
  let component: MissiondetailComponent;
  let fixture: ComponentFixture<MissiondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MissiondetailComponent,
      ],
      providers: [
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
