export class Location {

  locationName: string;
  locationMainImage: string;
  entryType: string;
  locationTown: string;
  votes: number;

  constructor(obj?: any){
    this.locationName         = obj && obj.id           ||null;
    this.locationMainImage     = obj && obj.imageUrl     ||null;
    this.entryType    = obj && obj.venueType    ||null;
    this.locationTown         = obj && obj.town         ||null;
    this.votes        = obj && obj.vote         ||null;

  }
}
