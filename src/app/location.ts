export class Location {
  id: number;
  locationName: string;
  locationMainImage: string;
  description: string;
  entryType: string;
  locationTown: string;
  votes: number;
  postCode: string;



  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
