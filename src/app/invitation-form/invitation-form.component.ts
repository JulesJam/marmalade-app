import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { AuthService, TokenPayload } from '../auth.service'
import { User } from '../user';
import { Invitation } from '../invitation';
import { siteURL } from '../../environments/siteURL';
import { InvitationDataService } from '../invitation-data.service';

@Component({
  selector: 'invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.css']
})
export class InvitationFormComponent implements OnInit {

  private currentUser: User; 
  invitationForm: FormGroup;
  recipientEmail: string;
  recipientFirstName: string;
  isHidden: boolean = true;
  sentInvitation: Invitation = new Invitation();
  returnedInvitation: Invitation = new Invitation();

  constructor(fb: FormBuilder, private auth: AuthService, private invitationDataService: InvitationDataService) {
    this.invitationForm = fb.group({
      'recipientEmailAddress': ['', Validators.compose([Validators.email, Validators.required])],
      'recipientFirstName': ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])]
      });



  }

  toggleForm(): void {
    this.isHidden = !this.isHidden;
    console.log("Form toggled", this.isHidden);
  }

  onSubmit(invitationForm): void{
    console.log("invitation form", invitationForm, "and user is >>>", this.currentUser);

    this.sentInvitation.senderId = this.currentUser._id;
    this.sentInvitation.jarId = this.currentUser.primaryJarId.jarId;
    this.sentInvitation.recipientEmailAddress = invitationForm.recipientEmailAddress;
    this.sentInvitation.recipientFirstName = invitationForm.recipientFirstName;
    this.sentInvitation.senderMembershipLevel = this.currentUser.primaryJarId.membershipLevel;
    this.sentInvitation.emailSentDate = [Date.now()];

    console.log("sending this invitation ++++", this.sentInvitation);

    this.invitationDataService  
      .addInvitation(this.sentInvitation)
      .subscribe(
        returnedInvitation =>{
        console.log("returned invitaion",returnedInvitation);
        let invitationLink =siteURL.development+"home/"+returnedInvitation._id
         this.sendEmail(returnedInvitation, invitationLink);
        }
        )
    /*window.location.href = "mailto:"+invitationForm.recipientEmailAddress+"?subject=This is a really good site for Hotel and Restaurant Recommendations&body=Hi%20goes%20here"*/
  }

  sendEmail(returnedInvitation, invitationLink){
    console.log("invitation process response >>>>>", returnedInvitation);
    let emailSubject = "This is a really good site for Hotel and Restaurant"
    let emailBody = "Hi "+returnedInvitation.recipientFirstName+'\r\n'+"Midnight Marmalade is a new recommendation site for cool bars, restaurants, coffee shopes etc. It's different because reviews are grouped by people who are connected so you know they are reliable or at least how likely they are to be reliable. If you wnat to see my recommendations and add your own you can join the group I am in by pasting this link - "+invitationLink+" into your browser. Alternatively go to midnightmarla.de and register and eneter this Invitaion code: "+returnedInvitation._id+'\r\n'+'\r\n'+"All the best "
    emailBody = encodeURIComponent(emailBody);
     

    location.href = "mailto:"+returnedInvitation.recipientEmailAddress+'?subject='+emailSubject+'&body='+emailBody;

 
  }

  ngOnInit() {
    this.currentUser = this.auth.currentUser
    console.log("Invitaion current user is...", this.currentUser)
   
  }

}
