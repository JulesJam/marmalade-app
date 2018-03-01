
/*describe('#save(location)', () => {

  it('should automatically assign an incrementing id', inject([LocationDataService], (service: LocationDataService) => {
    let location1 = new Location({locationName: 'location 1', votes: 10});
    let location2 = new Location({locationName: 'location 2', votes: 5});
    service.addLocation(location1);
    service.addLocation(location2);
    expect(service.getLocationById(1)).toEqual(location1);
    expect(service.getLocationById(2)).toEqual(location2);
  }));

});

describe('#deleteLocationById(id)', () => {

  it('should remove location with the corresponding id', inject([LocationDataService], (service: LocationDataService) => {
    let location1 = new Location({locationName: 'location 1', votes: 10});
    let location2 = new Location({locationName: 'location 2', votes: 5});
    service.addLocation(location1);
    service.addLocation(location2);
    expect(service.getAllLocations()).toEqual([location1, location2]);
    service.deleteLocationById(1);
    expect(service.getAllLocations()).toEqual([location2]);
    service.deleteLocationById(2);
    expect(service.getAllLocations()).toEqual([]);
  }));

  it('should not removing anything if location with corresponding id is not found', inject([LocationDataService], (service: LocationDataService) => {
    let location1 = new Location({locationName: 'location 1', votes: 10});
    let location2 = new Location({locationName: 'location 2', votes: 5});
    service.addLocation(location1);
    service.addLocation(location2);
    expect(service.getAllLocations()).toEqual([location1, location2]);
    service.deleteLocationById(3);
    expect(service.getAllLocations()).toEqual([location1, location2]);
  }));

});

describe('#updateLocationById(id, values)', () => {

  it('should return location with the corresponding id and updated data', inject([LocationDataService], (service: LocationDataService) => {
    let location = new Location({locationName: 'location 1', votes: 10});
    service.addLocation(location);
    let updatedLocation = service.updateLocationById(1, {
      title: 'new title'
    });
    expect(updatedLocation.title).toEqual('new title');
  }));

  it('should return null if location is not found', inject([LocationDataService], (service: LocationDataService) => {
    let location = new Location({locationName: 'location 1', votes: 10});
    service.addLocation(location);
    let updatedLocation = service.updateLocationById(2, {
      title: 'new title'
    });
    expect(updatedLocation).toEqual(null);
  }));

});

describe('#toggleLocationComplete(location)', () => {

  it('should return the updated location with inverse complete status', inject([LocationDataService], (service: LocationDataService) => {
    let location = new Location({locationName: 'location 1', votes: 10});
    service.addLocation(location);
    let updatedLocation = service.toggleLocationComplete(location);
    expect(updatedLocation.complete).toEqual(true);
    service.toggleLocationComplete(location);
    expect(updatedLocation.complete).toEqual(false);
  }));

});*/