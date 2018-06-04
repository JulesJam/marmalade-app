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
  isHidden: boolean;

  constructor(fb: FormBuilder, private auth: AuthService) {
    this.invitationForm = fb.group({
      'recipientEmailAddress': ['', Validators.compose([Validators.email, Validators.required])],
      'recipientFirstName': ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])]
      });



  }

  toggleForm(): void {
    this.isHidden =!this.isHidden;
  }

  onSubmit(invitationForm){
    console.log("invitation form", invitationForm, "and user is >>>", this.currentUser);
    window.location.href = "mailto:"+invitationForm.recipientEmailAddress+"?subject=This is a really good site for Hotel and Restaurant Recommendations&body=Hi%20goes%20here"
  }

  ngOnInit() {
    this.currentUser = this.auth.currentUser
    console.log("Invitaion current user is...", this.currentUser)
    this.isHidden = true;
  }

}
