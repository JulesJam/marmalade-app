import { UserComment } from './user-comment';

export class UserLocation {
  _id: string;
  userId: string;
  dateCreated: Date = new Date();
  modifiedDate: Date = new Date();
  locationId: string;
  jarLocationId: string;
  comments: UserComment [] ;
  entryType: string;
  userTags: string [];
  views: number [];
  //user comments is an array of comment id's
  //upvote down votes set if user has made that action to manage once only voting
  upVoted: boolean;
  downVoted: boolean;
  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
