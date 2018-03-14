import { Component} from '@angular/core';
import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  public invalidRegister: boolean;
  public registerError: string;

  credentials: TokenPayload ={
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: ''
      }

   
   



  constructor(private auth: AuthService, private router: Router) {
   this.invalidRegister = false;
   this.registerError = "";
  }

 

  register(){
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('locations');
      }, (err) => {
        console.log("register error",err.message);
        this.invalidRegister = true;
        this.registerError = err.message
    });
  }

}
