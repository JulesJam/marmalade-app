import {Component,
 OnInit,
 Input,
 HostBinding } from '@angular/core';

 import { Location } from '../models/location';

@Component({
  selector: 'location-image',
  template: `<img class="location-image "src="{{imgPath}}">`,
  styleUrls: ['./location-image.component.css']
})
export class LocationImageComponent implements OnInit {
  @Input() location: Location
  @HostBinding('attr.class') cssClass = 'location-image'

  imgPath: string;


  
  constructor() {
   }

  ngOnInit() {
    if (!this.location.locationMainImage){
      this.imgPath = "/assets/images/locations/missing.png"
    } else {
      this.imgPath = "https://s3.eu-west-2.amazonaws.com/marmalade-test-bucket/" + this.location.locationMainImage
    }
 
  }

}
