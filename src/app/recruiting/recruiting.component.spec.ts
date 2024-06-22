import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { environment } from '../../environments/environment'
import { routes } from '../app.routes';
import { RecruitingComponent } from './recruiting.component';

describe('RecruitingComponent', () => {
  let component: RecruitingComponent;
  let fixture: ComponentFixture<RecruitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideAnimations(),
      ],
      declarations: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
