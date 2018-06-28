export class UserComment {

  _id: string;
  userId: string;
  dateCreated: Date = new Date();
  userLocationId: string;
  comment: string;

  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
