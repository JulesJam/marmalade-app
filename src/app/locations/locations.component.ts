import {
  Component,
  EventEmitter
  } from '@angular/core';

import { Location } from '../location';
import { User } from '../user';
import { AuthService } from '../auth.service'

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
  private currentUser 

  constructor(private locationDataService: LocationDataService, private auth: AuthService) {
    this.loading = true;
    this.currentUser = auth.currentUser
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
