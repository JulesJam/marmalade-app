import { 
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Invitation } from '../models/invitation';

import { InvitationDataService } from '../invitation-data.service';


import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  @Input() inviteCode: string;
  @Output() registerSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  

  registerForm: FormGroup;



  public invalidRegister: boolean;
  public registerError: string;
  public processing: boolean;
  public hasInviteCode: boolean;
  public receivedInvitation: Invitation;
  private formTitle: string;



   
   



  constructor(fb: FormBuilder, private auth: AuthService, private router: Router, private invitationDataService: InvitationDataService) {

    this.registerForm = fb.group({
      'email': ['', Validators.compose([Validators.email, Validators.required])],
      'firstName': ['', Validators.compose([Validators.minLength(2),Validators.required,Validators.pattern('[a-zA-Z ]*') ])],
      'lastName': ['', Validators.compose([Validators.minLength(2),Validators.required,Validators.pattern('[a-zA-Z ]*')])],
      'password': ['', Validators.compose([Validators.minLength(8),Validators.required, ])],
      'passwordConfirmation': ['', Validators.compose([Validators.minLength(8),Validators.required, ])],
      'marketingConsent': [false],
      'contactConsent': [false, Validators.requiredTrue],
      'inviteCode': [''],
      'jarName': [''],
      'hasInviteCode': [null, Validators.required],
      'visits': [[]],
      });
  

    this.invalidRegister = false;
    this.registerError = "";
    this.processing = false;
    this.hasInviteCode = null;
    this.formTitle ="Register here"
  }

  onHasInviteCode(hasInviteCode, inviteCode): void{
    this.hasInviteCode = hasInviteCode;


    if(inviteCode){
    this.registerForm.patchValue({inviteCode: inviteCode});
    this.registerForm.patchValue({hasInviteCode: true})
    this.invitationDataService.getInvitation(inviteCode)
      .subscribe(
        (response)=>{
          console.log("reponse is ", response)
          if(response.invitation){
          this.receivedInvitation = response.invitation;
          this.registerForm.patchValue({firstName: this.receivedInvitation.recipientFirstName});
          this.registerForm.patchValue({email: this.receivedInvitation.recipientEmailAddress})
          this.formTitle = "Thanks "+this.receivedInvitation.recipientFirstName+" for accepting your invite - please register here";
          };
          if(response.success === false){
            this.registerError = response.message;
            this.invalidRegister = true;
           
          }
        }
      );
    };
    if (!hasInviteCode) this.registerForm.patchValue({inviteCode: ''});
    
   
  }






  register(credentials: TokenPayload){
    this.processing = true;
    this.auth.register(credentials).subscribe(() => {
      this.router.navigateByUrl('home');
      this.auth.logout();
      this.registerSuccess.emit(true);
      this.processing = false;
      }, (err) => {
        this.invalidRegister = true;
        console.log("register error was ",err);
        this.registerError = err.error.message + "please try different credentials"
        this.processing = false;
    });
  }

  ngOnInit() {
    if(this.inviteCode) {
      this.onHasInviteCode(true, this.inviteCode);
    };
  }

}
