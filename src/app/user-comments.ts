export class UserComments {

  _id: string;
  userId: string;
  dateCreated: Date = new Date();
  userEntryId: string;
  comment: string;

  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
