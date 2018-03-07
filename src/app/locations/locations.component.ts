import {
  Component,
  EventEmitter
  } from '@angular/core';

import { Location } from '../location';

import { LocationDataService } from '../location-data.service';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent  {

  locations: Location[];
  loading: boolean;
    data: Object;

  constructor(private locationDataService: LocationDataService) {
    this.loading = true;
   }

  locationWasSelected(location: Location): void {
    console.log('Location Selected: ', location);
  }



  public ngOnInit() {
    this.locationDataService
      .getAllLocations()
      .subscribe(
        (locations) => {
        this.locations = locations
        this.loading = false;
        }
      );
  }

}
