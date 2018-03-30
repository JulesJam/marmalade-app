import { TestBed, inject } from '@angular/core/testing';

import { ApiNewService } from './api-new.service';

describe('ApiNewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiNewService]
    });
  });

  it('should be created', inject([ApiNewService], (service: ApiNewService) => {
    expect(service).toBeTruthy();
  }));
});
