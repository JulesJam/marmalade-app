export class Jar {
  _id: string;
  jarName: string;
  jarIcon: string;
  //user id
  members: string[] = [];
  //invite  id
  invites: string[] = [];
  //location id
  locations: string[] = [];
  date_created: Date = new Date();





  constructor(values: Object ={}){
    Object.assign(this, values);
  }

  
}
