export class Location {
  _id: string;
  locationName: string;
  locationMainImage: string;
  description: string;
  entryType: string;
  locationAddress: string;
  locationPostcode: string;
  locationMainTelephone: string;
  latitude: number;
  longitude: number;
  creatorID: string;
  googlePlaceTypes: any[];
  googlePlacesId: string;
  googleImageUrl: string;
  votes: number;



  constructor(values: Object ={}){
    Object.assign(this, values);
  }

  voteUp(): void{
    this.votes += 1;
  }

  voteDown(): void{
    if (this.votes != 0){this.votes -=1};
  }
}
