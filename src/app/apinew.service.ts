import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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
           console.log("response json", response);
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


    console.log("Query JAr Id ", jarId);
    return this.http
      .get<any>(this.API_URL + '/jar/'+jarId, httpOptions)
      .map(response => {
           console.log("response json", response.jar.jarLocations);
           //this need to change
           const jarLocations = response.jar.jarLocations;
           console.log("Response: jarLocations" , jarLocations, "response jar locations.locations ", jarLocations[1]);
           const locations = jarLocations
            .reduce((arr, jarLocation) => arr.concat(this.jarlocationUpdater(jarLocation, jarLocation.location)),[]);
          console.log("reduced locations ", locations);
           return locations.map((location) => new Location(location));
         })
  };

  jarlocationUpdater(jarLocation, location){
    
    location.jarLocationDescription = jarLocation.description;
    location.jarLocationType = jarLocation.jarLocationType;
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
    console.log('this works', location);
    return location;

  }

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
