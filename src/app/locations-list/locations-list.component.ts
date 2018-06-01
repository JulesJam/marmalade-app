import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';

import { Location } from '../location';
import { AuthService } from '../auth.service'

@Component({
  selector: 'locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})


export class LocationsListComponent  {
  
  @Input() locationList: Location[];
  @Output() onLocationSelected: EventEmitter<Location>;

  private currentUser

  private currentLocation: Location;

  constructor(public auth: AuthService) {
    this.currentUser = auth.currentUser;
    this.onLocationSelected = new EventEmitter();
  }

  clicked(location: Location): void {
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
    return this.locationList.sort((a: Location, b: Location) => b.votes - a.votes);
  }




}
