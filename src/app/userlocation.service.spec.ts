import { TestBed, inject } from '@angular/core/testing';

import { UserlocationService } from './userlocation.service';

describe('UserlocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserlocationService]
    });
  });

  it('should be created', inject([UserlocationService], (service: UserlocationService) => {
    expect(service).toBeTruthy();
  }));
});
