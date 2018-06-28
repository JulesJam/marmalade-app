
import { User } from './user';


export class JarLocation {
  
  _id: string;
  userId: string;
  dateCreated: Date = new Date();
  modifiedDate: Date = new Date();
  locationId: string;
  userIds: User [];
  jarId: string;
  jarLocationTypes: string [];
  tags: string []
  votes: number;
  //Entry type is recommendation or wishlist
  entryType: string;
  descriptions: string [];
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
