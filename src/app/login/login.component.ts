import { Component} from '@angular/core';
import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  private invalidLogin: boolean;
  private invalidLoginErrorMessage
  private processing: boolean
  


  credentials: TokenPayload = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
    marketingConsent: false,
    contactConsent: false,
    inviteCode: '',
    jarName: '',
    visits: []
  }

  constructor(private auth: AuthService, private router: Router) {
    this.invalidLogin = false;
    this.processing =false
  }

  login(){
    this.processing = true
    this.auth.login(this.credentials).subscribe(() =>{
      this.router.navigateByUrl('/locations');
      this.processing = false
      },(err) => {
      console.log("log in error", err.name," ",err.statusText);
      this.invalidLogin = true;
      this.invalidLoginErrorMessage = " log in error "+err.name+" "+err.statusText;
      this.processing = false;
    });
  }
}
