import { TestBed, inject } from '@angular/core/testing';

import { RosterService } from './roster.service';

describe('RosterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RosterService]
    });
  });

  it('should be created', inject([RosterService], (service: RosterService) => {
    expect(service).toBeTruthy();
  }));
});
