import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
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


export class MapComponent implements OnInit  {

  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  public zoom: number;
  public myLocation: number[];
  public myCountry: string;
  public located: boolean;
  
  public countryCode: string;

  @ViewChild('search')
  public searchElementRef: ElementRef;





  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private userLocation: UserLocationService
  ) { }

 

  ngOnInit() {

    this.zoom = 4;
    this.latitude = 51.4686;
    this.longitude = -0.1335;
    this.located = false

    this.searchControl = new FormControl();


    

    this.userLocation.setCurrentPosition()
      .then(
      (coords) => {
        console.log("coords",coords);
        this.userLocation.setCurrentCountry(coords)
        .then(
          (countryCode) => {
            console.log("Detected Country = ",countryCode);
            this.userLocation.findPlaceDetails(countryCode, this.searchElementRef.nativeElement, this.searchControl);
          }
        );
      })
      .catch(
      (err) => console.error("Geolocation Failed ", err));

    
    

  };

}
    
  


 

