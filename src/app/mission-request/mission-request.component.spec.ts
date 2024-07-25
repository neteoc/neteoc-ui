import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionRequestComponent } from './mission-request.component';

describe('MissionRequestComponent', () => {
  let component: MissionRequestComponent;
  let fixture: ComponentFixture<MissionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionRequestComponent]
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
