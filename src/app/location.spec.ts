import { Location } from './location';

describe('Location', () => {
  it('should create an instance', () => {
    expect(new Location()).toBeTruthy();
  });

  it('should accept values in the constructor',() =>{
    let location = new Location({
      locationName: 'My Location',
      votes: 10
    });
    expect(location.locationName).toEqual('My Location');
    expect(location.votes).toEqual(10);
  });

});
