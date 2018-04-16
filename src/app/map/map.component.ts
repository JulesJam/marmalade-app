import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/toPromise'



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit  {
  public userentry: string;
  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  public zoom: number;
  public myLocation: number[];
  public myCountry: string;
  
  public countryCode: string;

  @ViewChild('search')
  public searchElementRef: ElementRef;





  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

 

  ngOnInit() {

    this.zoom = 4;
    this.latitude = 51.4686;
    this.longitude = -0.1335;

    this.searchControl = new FormControl();


    

    this.setCurrentPosition()
      .then(
      (coords) => {
        console.log("coords",coords);
        this.setCurrentCountry(coords)
        .then(
          (countryCode) => {
            console.log("Detected Country = ",countryCode);
            this.findPlaceDetails(countryCode);
          }
        );
      })
      .catch(
      (err) => console.error("Geolocation Failed ", err));

    
    

  };



      

  setCurrentPosition() {
  
     return new Promise((resolve, reject) =>{
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("Position is ",position.coords.latitude, position.coords.longitude);
          console.log("is anything happening", position);
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.myLocation = [this.latitude, this.longitude]
          this.zoom = 15;
          resolve(this.myLocation);
        })
      } else {
        reject("Geolocation is not supported by this browser.");
      }
      
    });
  }



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

findPlaceDetails(myCountry){

    console.log("second promise");
    console.log("latlng", this.latitude);
    console.log("My country", myCountry);

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, { 
    bounds: {
      north: this.latitude + 0.01,
      south: this.latitude - 0.01,
      east: this.longitude + 0.01,
      west: this.longitude - 0.01,
    },
    strictBounds: true,
    componentRestrictions: { country: myCountry }
     
      
    });

    console.log("place",autocomplete);

    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {

        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if(place.geometry === undefined || place.geometry === null) {
          return;

        }

        let service: google.maps.places.PlaceResult = autocomplete.getPlace();

        console.log("this clicked place", place, service);
        console.log("search control", this.searchControl);
        console.log("SearchElement", this.searchElementRef.nativeElement.value);
        

        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 15;
      });

  });
 };
}
    
  


 

