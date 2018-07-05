export class Location {
  _id: string;
  locationId: string;
  jarId: string;
  locationName: string;
  locationMainImage: string;
  description: string;
  entryType: string;
  locationAddress: string;
  locationCountry: string;
  locationTown: string;
  locationPostcode: string;
  locationMainTelephone: string;
  website: string;
  coordinates: number [];
  creatorId: string;
  googlePlaceTypes: any[];
  googlePlacesId: string;
  googleImageUrl: string;
  votes: number;
  upVotedBy: string[];
  downVotedBy: string[];
  verifiedDate: Date = new Date();
  tags;
  jarLocationDescription: string;
  jarLocationVenueType: string;
  jarLocationEntryType: string;
  userLocationEntryType: string;
  jarLocationSource: string;
  userLocationSource: string;
  mapTag: string;




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
