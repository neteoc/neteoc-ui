import { TestBed, inject } from '@angular/core/testing';

import { MissionService } from './mission.service';

describe('MissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionService]
    });
  });

  it('should be created', inject([MissionService], (service: MissionService) => {
    expect(service).toBeTruthy();
  }));
});
