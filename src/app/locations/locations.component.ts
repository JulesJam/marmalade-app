import {
  Component,
  EventEmitter,
  OnInit,
  } from '@angular/core';

import { Location } from '../models/location';
import { User } from '../models/user';
import { AuthService, TokenPayload } from '../auth.service'

import { LocationDataService } from '../location-data.service';
import { RemindersService } from '../services/reminders.service';
import { ModalService } from '../modal.service';
import { PendingInviteReminderComponent } from '../pending-invite-reminder/pending-invite-reminder.component';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit  {

  locations: Location[];
  loading: boolean;
  data: Object;
  public currentUser: User;
  mapHeight: string = "300px";

  currentView: string = "jar";
  currentDisplayStyle: string = "list";

 

  constructor(private locationDataService: LocationDataService, private auth: AuthService, private modal: ModalService, private reminders: RemindersService) {
    this.loading = true;
    this.currentUser = auth.currentUser;
    

   
   }

  locationWasSelected(location: Location): void {
    console.log('Location Selected: ', location);
  }

  displayJarLocations(){
    this.loading = true;

    const jarId = this.currentUser.primaryJarId.jarId;
    this.locationDataService
      .getJarLocations(jarId)
      .subscribe(
        (locations) => {
        this.locations = locations
        this.loading = false;
        this.currentView = "jar";
        }
      );
  }

  displayAllLocations(){
    this.locationDataService
      .getAllLocations()
      .subscribe(
        (locations) => {
        this.locations = locations
        this.loading = false;
        this.currentView = "all";
        }
      );
  }

  toggleDisplayStyle(){
    console.log("changing display style");
    if(this.currentDisplayStyle == 'list'){
      this.currentDisplayStyle = 'map';
      this.mapHeight = '80vw'
    } else{
      this.currentDisplayStyle = 'list'
    }
  }



  public ngOnInit() {
    
    this.displayJarLocations();
    this.currentDisplayStyle = 'list';
    console.log("invitations reminder", this.reminders.invitationsReminder)

    if(this.currentUser.pendingInvitations > 0 && !this.reminders.invitationsReminder ){

      let modalContent = {
        currentUserFirstName: this.currentUser.firstName,
        pendingInvitations: this.currentUser.pendingInvitations
      };

      this.reminders.toggleInvitationReminder();
     
     this.modal.init(PendingInviteReminderComponent,modalContent,{} )

    }  
  }

}
