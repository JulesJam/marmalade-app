import {
  Component,
  EventEmitter,
  OnInit,
  } from '@angular/core';

import { Location } from '../location';
import { User } from '../user';
import { AuthService, TokenPayload } from '../auth.service'

import { LocationDataService } from '../location-data.service';
import { ModalService } from '../modal.service';
import { PendingInviteReminderComponent } from '../pending-invite-reminder/pending-invite-reminder.component';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent  {

  locations: Location[];
  loading: boolean;
    data: Object;
  private currentUser: User;

  constructor(private locationDataService: LocationDataService, private auth: AuthService, private modal: ModalService) {
    this.loading = true;
    this.currentUser = auth.currentUser;
   
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
    
    if(this.currentUser.pendingInvitations > 0 ){

      let modalContent = {
        currentUserFirstName: this.currentUser.firstName,
        pendingInvitations: this.currentUser.pendingInvitations
      }

     this.modal.init(PendingInviteReminderComponent,modalContent,{} )
    }  
  }

}
