import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsBlockComponent } from './missions-block.component';

describe('MissionsBlockComponent', () => {
  let component: MissionsBlockComponent;
  let fixture: ComponentFixture<MissionsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
