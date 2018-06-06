import { 
  Component,
  OnInit,
  Input
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
  @Input() inviteCode: string;
  

  registerForm: FormGroup;



  public invalidRegister: boolean;
  public registerError: string;
  public processing: boolean;
  public hasInviteCode: boolean;

  private formTitle: string;


   
   



  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {

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
    };
    console.log("invite code is ", this.inviteCode);
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

  ngOnInit() {
    if(this.inviteCode) {
      this.onHasInviteCode(true, this.inviteCode)
      this.formTitle = "Thanks for accepting your invite - please register here"
    };
    console.log("Invite code recived from home is ",this.inviteCode)
  }

}
