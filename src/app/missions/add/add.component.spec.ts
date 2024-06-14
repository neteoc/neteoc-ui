import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../../environments/environment'
import { routes } from '../../app.routes';
import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
