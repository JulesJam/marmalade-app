import {
  Component,
  EventEmitter       
 } from '@angular/core';


import { Location } from './location';

import { LocationDataService } from './location-data.service';

@Component({
  selector: 'marmalade-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  locations: Location[];
  loading: boolean;
    data: Object;
  
  
  constructor(private locationDataService: LocationDataService){
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
