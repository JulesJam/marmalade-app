import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
  } from '@angular/core';

import { Location } from '../models/location';


@Component({
  selector: 'locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
 /* changeDetection: ChangeDetectionStrategy.OnPush*/
})


export class LocationsListComponent  {
  
  @Input() locationList: Location[];
  @Output() onLocationSelected: EventEmitter<Location>;

  

  private currentLocation: Location;

  constructor() {
    this.onLocationSelected = new EventEmitter();
  }

  clicked(location: Location): void {
    console.log("You clicked ", location.locationName)
    this.currentLocation = location;
    this.onLocationSelected.emit(location);
  }

  isSelected(location: Location): boolean {
    if(!location || !this.currentLocation){
      return false;
    }
    return location.locationName === this.currentLocation.locationName
  }

  sortedLocations(): Location[] {
    return this.locationList.sort((a: Location, b: Location) => a.distanceFromUser - b.distanceFromUser);
  }




}
