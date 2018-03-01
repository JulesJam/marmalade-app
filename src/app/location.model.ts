export class Location {
  id: string;
  locationName: string;
  locationMainImage: string;
  description: string;
  entryType: string;
  locationTown: string;
  votes: number;
  postCode: string;

  constructor(obj?: any){
    this.id                   = obj && obj.id                      ||null;
    this.locationName         = obj && obj.locationName            ||null;
    this.locationMainImage    = obj && obj.locationMainImage       ||null;
    this.description          = obj && obj.description             ||null
    this.entryType            = obj && obj.entryType               ||null;
    this.locationTown         = obj && obj.locationTown            ||null;
    this.postCode             =obj && obj.postCode                 ||null;
    this.votes                = obj && obj.votes                   ||null;

  }
}
