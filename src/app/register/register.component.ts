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
  public  processing: boolean

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
   this.processing = false;
  }

 

  register(){
    this.processing = true;
    this.auth.register(this.credentials).subscribe(() => {
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
