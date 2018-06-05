import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Location } from './location';

import { Invitation } from './invitation';



@Injectable()
export class ApinewService {
  private API_URL = environment.apiUrl;
  private token: string;


  constructor(private http: HttpClient) { }

  private getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('marmalade-token'); 
    }
    return this.token;
  };


  //Get list of all locations using latest Angular HTTPClient

  public getAllLocations(): Observable<Location[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+`${this.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http
      .get<any>(this.API_URL + '/locations', httpOptions)
      .map(response => {
           console.log("response json", response);
           const locations = response;
           return locations.location.map((location) => new Location(location));
         })
  };


  //Post new location using latest angular HTTP Client
  
  public createLocation(location: Location, file: File): Observable<Location> {
    const formData: FormData = new FormData();
    if(file){
    formData.append('file', file, file.name)};
    formData.append('location', JSON.stringify(location));

    console.log('FormData <<<<<<<<<<', formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+`${this.getToken()}`,
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      })
    };
    return this.http
      .post<any>(this.API_URL + '/locations', formData, httpOptions)
      .map(response => {
      console.log('Post response', response)
      return new Location (response.location);
      })
      
  }

  public createInvitation(invitation: Invitation): Observable<Invitation> {
    const formData: FormData = new FormData();
    console.log("invitation being converted", invitation);
    
    /*formData.append('invitation', JSON.stringify(invitation));

    console.log('Invitation FormData <<<<<<<<<<', formData);*/
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+`${this.getToken()}`,
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      })
    };
    return this.http
      .post<any>(this.API_URL + '/invitations', invitation, httpOptions)
      .map(response => {
      console.log('Post response', response)
      return new Invitation (response.invitation);
      })
      
  }
  

}
