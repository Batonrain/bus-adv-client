import { TestBed } from '@angular/core/testing';

import { AllocationsService } from './allocations.service';

describe('AllocationsService', () => {
  let service: AllocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
