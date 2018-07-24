import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  private: login: boolean = false


  constructor() { }

  ngOnInit() {
  }

}
