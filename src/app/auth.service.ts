import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { User } from './models/user';

const API_URL = environment.apiUrl;




//need to check if interface is correct here

interface TokenResponse {
  token: string;
}

//again check interface is correct rather that creating a class

export interface TokenPayload {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName?: string;
  lastName?: string;
  marketingConsent: boolean;
  contactConsent: boolean;
  jarName?: string;
  inviteCode?: string;
  visits: any[];
}

@Injectable()

export class AuthService {

  public currentUser: User

  private token: string;


  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void{
    localStorage.setItem('marmalade-token', token);
    this.token = token;
  }

  private getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('marmalade-token'); 
    }
    return this.token;
  }

  public logout(): void{
   this.token = '';
   this.currentUser = null;
   window.localStorage.removeItem('marmalade-token');
   window.localStorage.removeItem('username');
   this.router.navigateByUrl('/');
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public getCurrentUserId(): string {
    let currentUser = this.getUserDetails()
    return currentUser._id;
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if(user){
      this.currentUser = user;
      return user.exp > Date.now()/1000;
    } else {
      return false;
    }
  }

 public request(method: 'post'|'get', type: 'login'|'register'|'locations', user?: TokenPayload): Observable<any> {
   let base;

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'multipart/form-data',
       'Accept': 'application/json',
       'Authorization': 'Bearer '+`${this.getToken()}`,
       'Access-Control-Allow-Origin': '*'
     })
   };

   if (method === 'post'){
     base = this.http.post(API_URL + `/${type}`, user);
   } else {
     base = this.http.get(API_URL + `/${type}`, httpOptions/*{headers:  {Authorization: `Bearer ${this.getToken()}`}}*/);
   }

   const request = base.pipe(
     map((data: TokenResponse) => {
       if (data.token){
         this.saveToken(data.token);
       }
       return data;
     })
   );

   return request;
 }

 public register(user: TokenPayload): Observable<any> {
  return this.request('post', 'register', user);
 }

 public login(user: TokenPayload): Observable<any> {
  return this.request('post', 'login', user);
 }

 public profile(): Observable<any> {
  return this.request('get', 'locations');
 }



}
