import { Location } from './location';
import { Invitation } from './invitation';
import { User } from './user';


interface TreeManager {
  branchCode: number[],
  members: string []
}


export class Jar {
  _id: string;
  creatorId: string;
  jarName: string;
  jarIcon: string;
  //user id
  members: User [];
  //invite  id
  invites: Invitation [];
  //location id
  locations: Location [];
  treeManager: TreeManager;
  date_created: Date = new Date();
  last_updated: Date = new Date();
  constructor(values: Object ={}){
    Object.assign(this, values);
  }

  
}
