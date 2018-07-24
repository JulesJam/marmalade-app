import { Component, OnInit } from '@angular/core';
import { ApinewService } from '../apinew.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  private login: boolean;
  private statusMessage: string;


  constructor(private apinew: ApinewService, private route: ActivatedRoute ) {
    this.login = true;
    this.statusMessage = 'Looking up confirmation details';
  }

  checkConfirmation(): void{
    this.route.params.subscribe( params => {
      let confirmationCode = params.id
      if(params.id){
        this.apinew.getUserConfirmation(confirmationCode)
        .subscribe(
          response =>{
            console.log("resposne is...",response);
            if(!response.success){this.statusMessage = "That link seem sto be invalid please contact support"} 
            else if (response.success){
              this.statusMessage = response.message
              this.login = false
            }
          }
            error =>{
              this.statusMessage = "That link seems to be invalid please contact support"
            }
        )
      }
     
    });
  }


  ngOnInit() {
    this.checkConfirmation();
  }

}
