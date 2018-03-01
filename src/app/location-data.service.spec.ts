import { TestBed, async, inject } from '@angular/core/testing';

import { LocationDataService } from './location-data.service';

describe('LocationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationDataService]
    });
  });

  it('should be created', inject([LocationDataService], (service: LocationDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllLocations()', () => {

    it('should return an empty array by default', inject([LocationDataService], (service: LocationDataService) => {
      expect(service.getAllLocations()).toEqual([]);
    }));

    it('should return all locations', inject([LocationDataService], (service: LocationDataService) => {
      let location1 = new Location({locationName: 'location 1', votes: 10});
      let location2 = new Location({locationName: 'location 2', votes: 5});
      service.addLocation(location1);
      service.addLocation(location2);
      expect(service.getAllLocations()).toEqual([location1, location2]);
    }));

  });

});
