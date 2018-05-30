import { 
  Component
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';


import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  registerForm: FormGroup;



  public invalidRegister: boolean;
  public registerError: string;
  public processing: boolean;
  public hasInviteCode: boolean;

  /*credentials: TokenPayload ={
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
    marketingConsent: false,
    contactConsent: false,
    inviteCode: '',
    jarName: ''
  }*/

   
   



  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {

    this.registerForm = fb.group({
      'email': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'password': ['', Validators.required],
      'passwordConfirmation': ['', Validators.required],
      'marketingConsent': [false],
      'contactConsent': [false],
      'inviteCode': [''],
      'jarName': [''],
      'hasInviteCode': [null],
      'visits': [[]],
      });
  
  
    this.invalidRegister = false;
    this.registerError = "";
    this.processing = false;
    this.hasInviteCode = null;
  }

  onHasInviteCode(hasInviteCode): void{
    this.hasInviteCode = hasInviteCode;
    console.log("invite code is ", this.hasInviteCode);
  }

 

  register(credentials: TokenPayload){
    this.processing = true;
    console.log("credentials are",credentials);
    this.auth.register(credentials).subscribe(() => {
      this.router.navigateByUrl('locations');
      this.processing = false;
      }, (err) => {
        console.log("register error",err.message);
        this.invalidRegister = true;
        this.registerError = err.message
        this.processing = false;
    });
  }

}
