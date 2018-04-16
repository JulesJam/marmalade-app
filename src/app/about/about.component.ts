import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
 location: string

  
  constructor() {
    this.location = "";
  
   }

  findMe() {
    alert("Looking for you...");
      if (navigator.geolocation) {
        console.log("looking now...");
        navigator.geolocation.getCurrentPosition((position) => {
          let currentLat = position.coords.latitude.toString()
          let currentLong = position.coords.longitude.toString()
          this.location = "Your latitude : " + currentLat + " longitude: " + currentLong;
          console.log("Position is ",position.coords.latitude, position.coords.longitude);
          console.log("is anything happening");
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

  ngOnInit() {
    
    this.findMe()


  }

}
