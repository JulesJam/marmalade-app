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
    this.checkForInviteCode()
  }

}
