import { Injectable } from '@angular/core';
import { Location } from './location';
import { ApiService } from './api.service';
import { ApinewService } from './apinew.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationDataService {
  
  lastId: number = 0

  locationList: Location[] = [];

  constructor(private api: ApiService, private apinew: ApinewService) {
    
   }


  addLocation(location: Location, file: File):  Observable<Location> {
    console.log("new location returned", location);
    return this.apinew.createLocation(location, file);

  }



  deleteLocationById(id: string): LocationDataService {
    this.locationList = this.locationList
      .filter(location => location._id !== id);
    return this;
  }

  updateLocationById(id: string, values: Object = {}): Location{
    let location = this.getLocationById(id);
    if (!location) {
    return null;
    }
    Object.assign(location, values);
    return location;
  }

  updateLocation(location: Location):  Observable<Location> {
    console.log("updated returned", location);
    return this.api.updateLocation(location);

  }



  getAllLocations(): Observable<Location[]>{
    return this.apinew.getAllLocations();
  }

  getLocationById(id: string): Location{
    return this.locationList
    .filter(location => location._id === id)
    .pop();
  }

}
