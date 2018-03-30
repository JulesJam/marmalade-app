import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Location } from './location';



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

  public getAllLocations(): Observable<Location[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+`${this.getToken()}`
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

  public createLocation(location: Location): Observable<Location> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+`${this.getToken()}`
      })
    };
    return this.http
      .post<any>(this.API_URL + '/locations', location, httpOptions)
      .map(response => {
      console.log('Post response', response)
      return new Location (response.location);
      })
      
  }
  

}
