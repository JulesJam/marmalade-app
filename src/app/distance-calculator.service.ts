import { Injectable } from '@angular/core';

@Injectable()
export class DistanceCalculatorService {

  constructor() { }

  public miles(lat1, lon1, lat2, lon2): number{
    var R = 6371; // Radius of the earth in kilometers
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1.60934 ; // Distance in M
    if(d > 10){
      d = Math.round(d);
    } else if (d < 10){
      d = (Math.round(d * 100)) / 100;
    }
    return d ;
  }

  private deg2rad(deg): number {
    return deg * (Math.PI / 180)
  }

}
