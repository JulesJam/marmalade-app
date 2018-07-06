import { 
  Component,
  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  loginButtonsActive: boolean;
  register: boolean;
  login: boolean;
  inviteCode: string;
  registerMessage: string = '';



  constructor(private route: ActivatedRoute) {

   }

  showLogin(): void {
    this.login =false;
    this.register = true;
    this.loginButtonsActive = true;
    
  }

  showRegister(): void {
    this.register = false;
    this.login = true;
    this.loginButtonsActive = true;
    
  }

  onRegister(result: boolean): void {
    this.register = result;
    this.login = !result;
    this.loginButtonsActive = true;
    this.registerMessage = "Yeah. You just joined MidnightMarmalade please sign in to start adding your favourite places";
    console.log(this.registerMessage);
   
  
  }


  checkForInviteCode(): void{
    this.route.params.subscribe( params => {
      this.inviteCode = params.id
      if(params.id){
        
        this.showRegister();
      }
      console.log("Route Params is", this.inviteCode)});
  }

  
  ngOnInit() {
    this.register = true;
    this.login = true;
    this.loginButtonsActive = false;
    this.inviteCode = null;
    this.checkForInviteCode();
    this.registerMessage = '';
  }

}
