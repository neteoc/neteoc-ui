import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { MissionlistComponent } from './missionlist.component';

describe('MissionlistComponent', () => {
  let component: MissionlistComponent;
  let fixture: ComponentFixture<MissionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MissionlistComponent,
        Firestore,
        Auth]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
