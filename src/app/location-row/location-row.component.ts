import {
  Component,
  OnInit,
  Input,
  HostBinding } from '@angular/core';

import { Location } from '../location';

@Component({
  selector: 'location-row',
  templateUrl: './location-row.component.html',
})
export class LocationRowComponent{
  
  @Input() location: Location
  @HostBinding('attr.class') cssClass = 'item';
 

}
