import { TestBed } from '@angular/core/testing';

import { UserDevicesService } from './user-devices.service';

describe('UserDevicesService', () => {
  let service: UserDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
