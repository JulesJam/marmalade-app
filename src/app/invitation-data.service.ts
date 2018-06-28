import { Injectable } from '@angular/core';
import { Invitation } from './models/invitation';

import { ApinewService } from './apinew.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvitationDataService {
  
  lastId: number = 0

  invitationList: Invitation[] = [];

  constructor(private apinew: ApinewService) {
    
   }


  addInvitation(invitation: Invitation):  Observable<Invitation> {
    console.log("new invitation returned", invitation);
    return this.apinew.createInvitation(invitation);

  }

/*

  deleteInvitationById(id: string): InvitationDataService {
    this.invitationList = this.invitationList
      .filter(invitation => invitation._id !== id);
    return this;
  }

  updateInvitationById(id: string, values: Object = {}): Invitation{
    let invitation = this.getInvitationById(id);
    if (!invitation) {
    return null;
    }
    Object.assign(invitation, values);
    return invitation;
  }

  updateInvitation(invitation: Invitation):  Observable<Invitation> {
    console.log("updated returned", invitation);
    return this.api.updateInvitation(invitation);

  }



  getAllInvitations(): Observable<Invitation[]>{
    return this.apinew.getAllInvitations();
  }

  getInvitationById(id: string): Invitation{
    return this.invitationList
    .filter(invitation => invitation._id === id)
    .pop();
  }*/

}