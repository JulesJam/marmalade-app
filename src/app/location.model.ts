export class Location {

  locationName: string;
  locationMainImage: string;
  description: string;
  entryType: string;
  locationTown: string;
  votes: number;

  constructor(obj?: any){
    this.locationName         = obj && obj.locatinName            ||null;
    this.locationMainImage    = obj && obj.locationMainImage     ||null;
    this.description          = obj && obj.description  ||null
    this.entryType            = obj && obj.entryType    ||null;
    this.locationTown         = obj && obj.locatioTown         ||null;
    this.votes                = obj && obj.votes        ||null;

  }
}
