import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

/*
import {
  Http,
  Response,
  RequestOptions,
  Headers      
  } from '@angular/http';
*/

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';



import { Location } from './location';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': 'token'
  })
};



@Injectable()
export class ApiService {

  private token: string;

  constructor(
    private http: HttpClient) {
   }

  private getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('marmalade-token'); 
    }
    return this.token;
  }



  //API: Get /locations

  public getAllLocations(): Observable<Location[]>{
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer '+ `${this.getToken()}`);
    this.token ="";

  return this.http.get<Location[]>(API_URL + '/locations', httpOptions)
      .pipe(
        tap(locations => new Location(location))),
        catchError(this.handleError)
        );
  }
   

  
  

 
  

  //API Post /locations


  /*
  public createLocation(location: Location): Observable<Location> {
    const headers: Headers = new Headers( { "Content-Type": "application/json",
               "Authorization": "Bearer "+`${this.getToken()}`});


    /*headers.append('Content-Type', 'application/json');

    headers.append('Authorization', 'Bearer '+`${this.getToken()}`);

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    opts.body = (location);

    console.log("OPts Headres>>>>>",opts.headers);
   
    
    JSON.stringify(opts);
    console.log ("Stringy opts", opts);
    return this.http
      .post(API_URL + '/locations', opts)
      .map(response => {
      return new Location (response.json().location);
      })
      .catch(this.handleError);
  }
 */
  public createLocation(location: Location): Observable<Location>{
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer '+ `${this.getToken()}`);
    return this.http.post<Location>(API_URL,location, httpOptions)
      .catch(this.handleError);

  }
  //API Get /location/:id
/*
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


*/

 

  private handleError (error: Response | any) {
  console.error('ApiService::handleError', error);
  return Observable.throw(error);
  }

}