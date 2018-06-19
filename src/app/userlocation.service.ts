import { Injectable } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/toPromise';

import { Location } from './location';


@Injectable()
export class UserLocationService {

  public latitude: number;
  public longitude: number;

  /*public searchControl: FormControl;*/
  public zoom: number;
  public myLocation: number[];
  public myCountry: string;
  public located: boolean;
  public selectedLocation: string;
  public googleLocation: Location = new Location();

  
  public countryCode: string;

  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    }

  setCurrentPosition() {
  
     return new Promise((resolve, reject) =>{
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("Position is ",position.coords.latitude, position.coords.longitude);
          console.log("is anything happening", position);
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.myLocation = [this.latitude, this.longitude]
          this.located = true;
          this.zoom = 16;
          resolve(this.myLocation);
        })
      } else {
        console.log("Geolocation failing");
        reject("Geolocation is not supported by this browser.");
      }
      
    });
  };

  setCurrentCountry(myCoords){
  
    return new Promise((resolve, reject) =>{
      console.log("looking for country");
      this.mapsAPILoader.load()
        .then(() => {
           console.log("First Promise");
           let geocoder = new google.maps.Geocoder;
           let latlng = {'lat': myCoords[0] ,'lng': myCoords[1]};
           geocoder.geocode({'location': latlng}, function(results, status) {
             console.log('Status',status, 'results', results);
             if(status == google.maps.GeocoderStatus.OK){
             console.log("array length ", results[0].address_components.length);
             let myCountry = results[0].address_components[results[0].address_components.length-2].short_name;
             console.log("results", results[0]);
             console.log("deep result", myCountry);
             resolve(myCountry);
            } else {
              reject("unable to find place")
            }
           });
        })
      });
  };

  findPlaceDetails(myCountry, searchParameters, searchControl){

      return new Promise((resolve, reject) =>{
        console.log("second promise");
        console.log("latlng", this.latitude);
        console.log("My country", myCountry);
  
        let autocomplete = new google.maps.places.Autocomplete( searchParameters, { 
        bounds: {
          north: this.latitude + 0.05,
          south: this.latitude - 0.05,
          east: this.longitude + 0.05,
          west: this.longitude - 0.05,
        },
        strictBounds: true,
        componentRestrictions: { country: myCountry }
         
          
        });
  
        console.log("place",autocomplete);
  
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
  
            let place: google.maps.places.PlaceResult =   autocomplete.getPlace();
            if(place.geometry === undefined || place.geometry ===   null) {
              reject("Place cannot be found");
  
            }
  
            let service: google.maps.places.PlaceResult =   autocomplete.getPlace();
  
            console.log("this clicked place", place);
            console.log("search control", searchControl);
            console.log("SearchElement", searchParameters.value);
            this.selectedLocation = searchParameters.value;
            searchParameters.value = "";
            
  
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 15;

            this.googleLocation.locationName = place.name;

            this.googleLocation.locationAddress = this.selectedLocation;

            this.googleLocation.locationTown = place.address_components[3].long_name;


            this.googleLocation.locationPostcode = place.address_components[place.address_components.length - 1].long_name;

            this.googleLocation.locationCountry = place.address_components[place.address_components.length - 2].short_name;

            this.googleLocation.locationMainTelephone = place.formatted_phone_number;

            this.googleLocation.latitude = this.latitude;

            this.googleLocation.longitude = this.longitude;

            this.googleLocation.googlePlacesId = place.place_id;

            this.googleLocation.googlePlaceTypes = place.types;

            this.googleLocation.website = place.website;



           
            console.log("what is this selectedLocation", this.selectedLocation);
            console.log("location details being saved ", this.googleLocation);
            
           

            resolve(this.googleLocation)
          });

      });
    })
   };



}
