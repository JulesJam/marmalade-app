import {
Component,
OnInit,
Input } from '@angular/core';

import {
  UserLocationService
} from '../userlocation.service';

import {
  Location
} from '../models/location';

import { MouseEvent } from '@agm/core';

@Component({
  selector: 'display-map',
  templateUrl: './display-map.component.html',
  styleUrls: ['./display-map.component.css']
})
export class DisplayMapComponent  {

  @Input() locationList: Location[];
  // google maps zoom level
  currentLocation: number [];
  zoom: number = 5;
  
  // initial center position for the map
  lat: number = 0
  lng: number = 0

  markers: any[] 

  constructor (private userlocation: UserLocationService){

  };

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  
  //not using this but keep for future use
  /*mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }*/
  
  

/*  = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]*/


  ngOnInit () {
   this.userlocation.setCurrentPosition()
    .then((currentposition) =>{
      this.lat = currentposition[0];
      this.lng = currentposition[1];
      console.log("The position is now set", currentposition);
      console.log("the location list is ", this.locationList)
      const newarray = this.locationList.map((location) => 
       ( {'label':location.locationAddress,'lat': location.coordinates[1], 'lng':  location.coordinates[0]})
      
        )
      console.log("new arraay",newarray);
      this.markers = newarray
    })

    .catch((err) => console.error("Geolocation Failed ", err))
    
   
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}



