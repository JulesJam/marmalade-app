import { Injectable } from '@angular/core';
import { Location } from './location';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationDataService {
  
  lastId: number = 0

  locationList: Location[] = [];

  constructor(private api: ApiService) {
    
   }

  addLocation(location: Location): LocationDataService {
    if(!location.id) {
      location.id = ++this.lastId;
    }
    this.locationList.push(location);
    return this;

  }

  deleteLocationById(id: number): LocationDataService {
    this.locationList = this.locationList
      .filter(location => location.id !== id);
    return this;
  }

  updateLocationById(id: number, values: Object = {}): Location{
    let location = this.getLocationById(id);
    if (!location) {
    return null;
    }
    Object.assign(location, values);
    return location;
  }

  getAllLocations(): Observable<Location[]>{
    return this.api.getAllLocations();
  }

  getLocationById(id: number): Location{
    return this.locationList
    .filter(location => location.id === id)
    .pop();
  }

}
