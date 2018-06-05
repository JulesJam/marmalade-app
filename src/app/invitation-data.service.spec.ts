import { TestBed, inject } from '@angular/core/testing';

import { InvitationDataService } from './invitation-data.service';

describe('InvitationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationDataService]
    });
  });

  it('should be created', inject([InvitationDataService], (service: InvitationDataService) => {
    expect(service).toBeTruthy();
  }));
});
