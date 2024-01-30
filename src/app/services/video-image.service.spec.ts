import { TestBed } from '@angular/core/testing';

import { VideoImageService } from './video-image.service';

describe('VideoImageService', () => {
  let service: VideoImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
