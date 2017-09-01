import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsFormComponent } from './missions-form.component';

describe('MissionsFormComponent', () => {
  let component: MissionsFormComponent;
  let fixture: ComponentFixture<MissionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
