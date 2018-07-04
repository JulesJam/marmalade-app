import { Injectable } from '@angular/core';

@Injectable()
export class RemindersService {

  public invitationsReminder: boolean 


  constructor() { 
    this.invitationsReminder = false;
  }

  toggleInvitationReminder(){
    this.invitationsReminder = !this.invitationsReminder;
    console.log("Invitations Remidner changed to ", this.invitationsReminder);
  }

}
