export class Location {
  _id: string;
  locationName: string;
  locationMainImage: string;
  description: string;
  entryType: string;
  locationTown: string;
  votes: number;
  locationPostcode: string;
  



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
