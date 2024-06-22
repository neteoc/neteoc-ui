import { TestBed } from '@angular/core/testing';

import { RecruitingService } from './recruiting.service';

describe('RecruitingService', () => {
  let service: RecruitingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
