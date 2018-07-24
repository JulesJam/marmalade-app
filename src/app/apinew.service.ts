import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Location } from './models/location';

import { Invitation } from './models/invitation';



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
           const locations = response;
           return locations.locations.map((location) => new Location(location));
         })
  };

  public getJarLocations(jarId): Observable<Location[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+`${this.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };


    console.log("Query Jar Id ", jarId);
    return this.http
      .get<any>(this.API_URL + '/jar/'+jarId, httpOptions)
      .map(response => {
           //this need to change
           const jarLocations = response.jar.jarLocations;
           const locations = jarLocations
            .reduce((arr, jarLocation) => arr.concat(this.jarlocationUpdater(jarLocation, jarLocation.location)),[]);
           return locations.map((location) => new Location(location));
         })
  };

  jarlocationUpdater(jarLocation, location){
    
    if (jarLocation.descriptions){

      location.jarLocationDescription = jarLocation.descriptions[0];
    }
   
    location.jarLocationType = jarLocation.jarLocationType;
    location.jarLocationEntryType = jarLocation.entryType;
    
    switch(jarLocation.jarLocationType){
      case 'Pub':
        location.mapTag = '🍺';
        break;
      case 'Coffee Shop':
        location.mapTag = '☕️';
        break;
      case 'Restaurant':
        location.mapTag = '🍴';
        break;
      case 'Hotel':
        location.mapTag = '🛏';
        break;
      case 'Cockatil Bar':
        location.mapTag = '🍸';
        break
      default:
        'z';
    }
    return location;

  }

  //Post new location using latest angular HTTP Client
  
  public createLocation(location: Location, file: File): Observable<Location> {
    const formData: FormData = new FormData();
    if(file){
    formData.append('file', file, file.name)};
    formData.append('location', JSON.stringify(location));
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
      return new Location (response.location);
      })
      
  }

  public createInvitation(invitation: Invitation): Observable<Invitation> {
    const formData: FormData = new FormData();
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
      return new Invitation (response.invitation);
      })
      
  }

  public getInvitation(invitationId: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      })
    };
    
    return this.http
      .get<any>(this.API_URL + '/invitations/' + invitationId, httpOptions)
                  
  }

  public getUserConfirmation(confirmationId: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      })
    };

    return this.http
      .get<any>(this.API_URL+'/userConfirmations/'+confirmationId, httpOptions)
  }
  
  

}
