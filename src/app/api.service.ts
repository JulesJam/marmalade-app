import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  Http,
  Response,
  RequestOptions,
  Headers      
  } from '@angular/http';

import { Location } from './location';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  private token: string;

  constructor(
    private http: Http) {
   }

  private getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('marmalade-token'); 
    }
    return this.token;
  }

  //API: Get /locations

  public getAllLocations(): Observable<Location[]>{
  const headers: Headers = new Headers();
  headers.append('Authorization', 'Bearer '+`${this.getToken()}`);
  this.token ="";

  const opts: RequestOptions = new RequestOptions();
  opts.headers = headers
  return this.http
    .get(API_URL + '/locations',opts)
    .map(response => {
      console.log("response json", response.json());
      const locations = response.json();
      return locations.locations.map((location) => new Location(location));
    })
    .catch(this.handleError);

  }

  

  //API Post /locations

  public createLocation(location: Location): Observable<Location> {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    opts.body = (location);
   
    
    JSON.stringify(opts);
    console.log ("Stringy opts", opts);
    return this.http
      .post(API_URL + '/locations', opts)
      .map(response => {
      return new Location (response.json().location);
      })
      .catch(this.handleError);
  }

  //API Get /location/:id

  public getLocationById(locationId: Location): Observable<Location> {

    return this.http
      .get(API_URL + '/locations/' +locationId)
      .map(response => {
      return new Location(response.json());
      })
      .catch(this.handleError);
  }

  //API PUT /location.:id

  public updateLocation(location: Location): Observable<Location> {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    opts.body = (location);
    
    
    JSON.stringify(opts);
    console.log ("Stringy opts", opts);
    return this.http
    .patch(API_URL + '/locations/' + location._id, location)
    .map(response => {
      return new Location(response.json());
    })
    .catch(this.handleError);
  }

  //API DELETE /location/:id

  public deleteLocationById(locationId: number): Observable<null> {
  return this.http
    .delete(API_URL + '/locations/' + locationId)
    .map(response => null)
    .catch(this.handleError);
  }


 

  private handleError (error: Response | any) {
  console.error('ApiService::handleError', error);
  return Observable.throw(error);
  }

}
