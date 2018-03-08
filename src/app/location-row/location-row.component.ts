import {
  Component,
  OnInit,
  Input,
  HostBinding } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { LocationDataService } from '../location-data.service';

import { Location } from '../location';

@Component({
  selector: 'location-row',
  templateUrl: './location-row.component.html',
})
export class LocationRowComponent{

  newLocation: Location = new Location();
  
  @Input() location: Location
  @HostBinding('attr.class') cssClass = 'item';

  constructor(private locationDataService: LocationDataService){ 
    }

  voteUp(): boolean {
    this.location.voteUp();
    this.onVote(this.location);
    return false;
  }

  voteDown(): boolean {
   this.location.voteDown();
   this.onVote(this.location);
   return false;
  }

  onVote(location: Location): void{
   console.log("location being voted is ", location);
    this.locationDataService  
     .updateLocation(location)
     .subscribe(
       (newLocation) => {
       console.log("the update response is ", newLocation)
      }
     );
  }
}

