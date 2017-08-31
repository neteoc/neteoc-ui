import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsDetailComponent } from './missions-detail.component';

describe('MissionsDetailComponent', () => {
  let component: MissionsDetailComponent;
  let fixture: ComponentFixture<MissionsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
