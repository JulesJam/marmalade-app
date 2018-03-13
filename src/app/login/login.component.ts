import { Component} from '@angular/core';
import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public invalidLogin: boolean;
  


  credentials: TokenPayload = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: ''
  }

  constructor(private auth: AuthService, private router: Router) {
    this.invalidLogin = false;
  }

  login(){
    this.auth.login(this.credentials).subscribe(() =>{
      this.router.navigateByUrl('/locations');
      },(err) => {
      console.log("log in error", err.error.message);
      this.invalidLogin = true;
    });
  }
}
