import { ElementRef, NgZone, OnInit, ViewChild, Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/toPromise';

import { UserLocationService } from '../userlocation.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  
  public zoom: number;
  public myLocation: number[];
  public myCountry: string;
  public located: boolean;
  public newLocation: any;
  
  public countryCode: string;

  

  @ViewChild('search')
  public searchElementRef: ElementRef;

  

  @Output() notifyNewLocation: EventEmitter<any> 






  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private userLocation: UserLocationService
  ) {
    this.notifyNewLocation = new EventEmitter();
  }


  ngOnInit (){
  
    this.searchControl = new FormControl();
    this.zoom = 10;
    this.latitude = 51.4686;
    this.longitude = -0.1335;
    this.located = false;
    this.loadLocalSearch();
     
   };

  loadLocalSearch(){
    this.userLocation.setCurrentPosition()
      .then(
      (coords) => {
        console.log("coords",coords);
        this.userLocation.setCurrentCountry(coords)
        .then(
          (countryCode) => {
            console.log("Detected Country = ",countryCode);
            this.userLocation.findPlaceDetails(countryCode, this.searchElementRef.nativeElement, this.searchControl)
            .then(
              (newLocation) => {
                this.newLocation = newLocation;
                console.log("NewLocation is >>>", this.newLocation);
                this.notifyNewLocation.emit(this.newLocation);
                return false;
                  
              }
              );

          }
        );
      })
      .catch(
      (err) => console.error("Geolocation Failed ", err));
  }


}


 

  
  


 

