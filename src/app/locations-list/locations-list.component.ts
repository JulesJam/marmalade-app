import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';

import { Location } from '../location.model';

@Component({
  selector: 'locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent  {
  
  @Input() locationList: Location[];
  @Output() onLocationSelected: EventEmitter<Location>;

  private currentLocation: Location;

  constructor() {
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




}
