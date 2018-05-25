export class UserEntries {
  _id: string;
  userId: string;
  dateCreated: Date = new Date();
  jarEntryId: string;
  //Ownership status owner||collector
  ownershipStatus: string;
  entryType: string;
  //usre comments is an array of comment id's
  userComments: string[];
  //upvote down votes set if user has made that action to manage once only voting
  upVoted: boolean;
  downVoted: boolean;


  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
