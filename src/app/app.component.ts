import {
  Component,
  EventEmitter        
 } from '@angular/core';

import { Location } from './location.model';

@Component({
  selector: 'marmalade-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  locations: Location[];
  
  
  constructor(){
      this.locations = [
       new Location(
      "Bandol",
      "/assets/images/locations/bandol.jpg",
      "Restaurant",
      "Berlin",
      10
      ),
       new Location(
      "The Queensbury",
      "/assets/images/locations/queensbury.jpg",
      "Hotel",
      "Bath",
      6
      ),
       new Location(
      "The Clove Club",
      "/assets/images/locations/cloveclub.jpg",
      "Restaurant",
      "London",
      7)];
    }
  
  locationWasSelected(location: Location): void {
    console.log('Location Selected: ', location);
  }
  


}
