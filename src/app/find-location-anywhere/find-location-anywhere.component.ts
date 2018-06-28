import {
  ElementRef,
  Injectable,
  NgZone, 
  Component,
  OnInit,
  AfterViewInit,
  Output,
  ViewChild,
  EventEmitter
  } from '@angular/core';

import {
  FormControl,
  } from '@angular/forms';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/toPromise';
import { Location } from '../models/location';



import { UserLocationService } from '../userlocation.service';



@Component({
  selector: 'find-location-anywhere',
  templateUrl: './find-location-anywhere.component.html',
  styleUrls: ['./find-location-anywhere.component.css']
})


export class FindLocationAnywhereComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;

  public searchControl: FormControl;
  public selectedLocation: string;
  public googleLocation: Location = new Location();

  @ViewChild('autocomplete')
  public searchElementRef: ElementRef;

  @Output() notifyNewLocation: EventEmitter<any> 

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private userLocation: UserLocationService
    ) {
      this.notifyNewLocation = new EventEmitter();
    }

  ngOnInit() {
    this.searchControl = new FormControl();
    
    this.zoom = 10;
    this.latitude = 51.4686;
    this.longitude = -0.1335;
    
    
    
    
  }

  ngAfterViewInit(){
    this.loadSearch();
  }

  loadSearch(){
    this.mapsAPILoader.load()
      .then(() =>{
        let autocomplete = new google.maps.places.Autocomplete( this.searchElementRef.nativeElement,
              {types: ['geocode','establishment']});
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
        
            let place: google.maps.places.PlaceResult =   autocomplete.getPlace();
            if(place.geometry === undefined || place.geometry ===   null) {
              console.log("Place cannot be found");
        
            }
        
            let service: google.maps.places.PlaceResult =   autocomplete.getPlace();
        
            console.log("this clicked place", place);
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 15;

            this.selectedLocation = this.searchElementRef.nativeElement.value;

            
            this.googleLocation.locationName = place.name;

            this.googleLocation.locationAddress = this.selectedLocation;

            this.googleLocation.locationTown = place.address_components[3].long_name;


            this.googleLocation.locationPostcode = place.address_components[place.address_components.length - 1].long_name;

            this.googleLocation.locationCountry = place.address_components[place.address_components.length - 2].short_name;

            this.googleLocation.locationMainTelephone = place.formatted_phone_number;

            this.googleLocation.coordinates = [this.longitude, this.latitude];

            this.googleLocation.googlePlacesId = place.place_id;

            this.googleLocation.googlePlaceTypes = place.types;

            this.googleLocation.website = place.website;

            this.notifyNewLocation.emit(this.googleLocation);



            
            console.log("what is this selectedLocation", this.selectedLocation);
            
            return false;

           
          })
        })
      })
    }




   
   
    
}


