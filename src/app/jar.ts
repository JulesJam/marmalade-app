interface TreeManager {
  branchCode: string,
  members: string []
}


export class Jar {
  _id: string;
  creatorId: string;

  jarName: string;
  jarIcon: string;
  //user id
  members: string[] = [];
  //invite  id
  invites: string[] = [];
  //location id
  locations: string[] = [];
  treeManager: TreeManager;
  date_created: Date = new Date();
  last_updated: Date = new Date();





  constructor(values: Object ={}){
    Object.assign(this, values);
  }

  
}
