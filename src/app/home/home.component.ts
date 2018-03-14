import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  register: boolean;
  login: boolean;

  constructor() {
  
   }

  showLogin(): void {
    this.login =false;
    this.register = true
  }

  showRegister(): void {
    this.register = false;
    this.login = true
  }

  ngOnInit() {
    this.register = true;
    this.login = true;
  }

}
