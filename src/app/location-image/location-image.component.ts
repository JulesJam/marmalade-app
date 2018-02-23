import {Component,
 OnInit,
 Input,
 HostBinding } from '@angular/core';

 import { Location } from '../location.model';

@Component({
  selector: 'location-image',
  template: `<img class="location-image" [src]="location.imageUrl">`,
  styleUrls: ['./location-image.component.css']
})
export class LocationImageComponent implements OnInit {
  @Input() location: Location
  @HostBinding('attr.class') cssClass = 'ui small image'
  constructor() { }

  ngOnInit() {
  }

}
