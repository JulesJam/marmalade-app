import {
  Component,
  EventEmitter,
  OnInit,
  } from '@angular/core';

import { Location } from '../models/location';
import { User } from '../models/user';
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
  public currentUser: User;

  currentView: string = "all";
  currentDisplayStyle: string = "list";

  constructor(private locationDataService: LocationDataService, private auth: AuthService, private modal: ModalService) {
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
      this.currentDisplayStyle = 'map'
    } else{
      this.currentDisplayStyle = 'list'
    }
  }



  public ngOnInit() {
    
    this.displayAllLocations();
    this.currentDisplayStyle = 'list';
    
    if(this.currentUser.pendingInvitations > 0 ){

      let modalContent = {
        currentUserFirstName: this.currentUser.firstName,
        pendingInvitations: this.currentUser.pendingInvitations
      }

     this.modal.init(PendingInviteReminderComponent,modalContent,{} )
    }  
  }

}
