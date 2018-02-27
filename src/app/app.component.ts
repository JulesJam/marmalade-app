import {
  Component,
  EventEmitter       
 } from '@angular/core';

 import 'rxjs/Rx';

 import {
  Http,
  Response
 } from '@angular/http';

import { Location } from './location.model';

@Component({
  selector: 'marmalade-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  locations: Location[];
  loading: boolean;
  data: Object;
  
  
  constructor(private http: Http){
     /* this.locations = [
       {
      "locationName" : "Bandol",
      "locationMainImage": "/assets/images/locations/bandol.jpg",
      "locationType": "Restaurant",
      "locationTown": "Berlin"
      }, {
      "locationName": "The Queensbury",
      "locationMainImage": "/assets/images/locations/queensbury.jpg",
      "locationType": "Hotel",
      "locationTown": "Bath"
      },{
      "locationName": "The Clove Club",
      "locationMainImage": "/assets/images/locations/cloveclub.jpg",
      "locationType": "Restaurant",
      "locationTown": "London",
      }];*/

      this.makeLocationListRequest(http);
      console.log(this.locations);
     

  }
  
  locationWasSelected(location: Location): void {
    console.log('Location Selected: ', location);
  }

  makeLocationListRequest(http): void {
    console.log("running request");
    console.log("locations is ", this.locations);
    this.loading = false;
    this.http.request('http://localhost:3000/api/locations')
    .map(res => res.json())
    .subscribe(
      data => this.locations = data.locations,
      err => console.log('Error!!!'),
      () => console.log("returned locations", this.locations)
      
      );

      
    }


  
  

}
