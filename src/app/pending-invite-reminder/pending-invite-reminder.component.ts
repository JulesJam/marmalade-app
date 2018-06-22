import { Component, OnInit } from '@angular/core';

import { ModalService } from '../modal.service';


@Component({
  selector: 'pending-invite-reminder',
  templateUrl: './pending-invite-reminder.component.html',
  styleUrls: ['./pending-invite-reminder.component.css']
})
export class PendingInviteReminderComponent  {

  firstName: string;
  pendingInvites: number;
 
  constructor( private modal: ModalService) {
    
   }

  public close() {
    this.modal.destroy();
  }

  public ngOnInit() {
    
    console.log("modal Inputs",this)
  }

 
}