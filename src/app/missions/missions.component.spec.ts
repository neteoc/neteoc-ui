import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionsComponent } from './missions.component';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

describe('MissionsComponent', () => {
  let component: MissionsComponent;
  let fixture: ComponentFixture<MissionsComponent>;

  // Mock Firestore and Auth objects
  const mockFirestore = {/* Mock methods and properties as needed */};
  const mockAuth = {/* Mock methods and properties as needed */};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: mockFirestore },
        { provide: Auth, useValue: mockAuth }
      ],
      declarations: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});