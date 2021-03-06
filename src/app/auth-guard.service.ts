import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(){
    if(!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      console.log("Auth guard activated redirect");
      return false
    }
    return true;
  }

}
