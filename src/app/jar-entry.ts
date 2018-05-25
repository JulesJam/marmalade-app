export class JarEntry {
  
  _id: string;
  userId: string;
  dateCreated: Date = new Date();
  modifiedDate: Date = new Date();
  locationId: string;
  //Entry type is recommendation or wishlist
  entryType: string;
  primaryDescription: string;
  //views should be an array of dates when this entry was displayed to users
  views: number[];
  //source is where this venue was discovered e.g.a visit, Newspaper review, TV review
  source: string;
  verifiedByUserId: string;
  verifiedDate: Date = new Date();
  upVotedBy: string[];
  downVotedBy: string[];
  hidden: boolean;

  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
