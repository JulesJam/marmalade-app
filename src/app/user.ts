interface JarMemberships {
  jarId: string,
  membershipLevel: number,
  branchCode: number [],
  childCode: number
}


//jar memberships - membership levels is 1 greater than person who invited you
//branch code is an array of numbers to identify which branch of family tree user is in 
//for this jar
//brnach code is based on an array represenation of  numbers the next brach is 
//determined by the jar branh tracker value, this increase by one each time a user 
//generates an invitation - the user then has a branch code which is passed to all 
//invitees e.g. a user with branch code 0, 1 would be in the second levele of tree and 
//be related to all others with 0,1 branchCode - if one of these invites sends an invite
//the invited user will be 0,1,2 , the childCode of the person making the invite is 2
//thus all other invitatiosn from that inviting user will have  0,1,2 as a branch code
//the invited people are identified as being on 3rd level of tree as they have 3 digits 
//their branchCode

export class User {

  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  //not in use yet
  contactTelephone: string;
  //avatar image id 
  avatar: string;
  marketingConsent: boolean;
  marketingConsentSetDate: Date = new Date();
  contactConsent: boolean;
  contactConsentSetDate: Date = new Date();
  inviteCode: string;
  jarOwnerJarId: string;
  //memberships [jarId, membershiplevel]
  jarMemberships: [{JarMemberships}];
  //the jar either created or first joined
  primaryJarId: JarMemberships;
  visits: [new() => Date];
  //to add a direct relationship to someone who is already a member
  friends: string[];
  isActivated: boolean;

  exp: number;
  iat: number;

  constructor(values: Object ={}){
    Object.assign(this, values);
  }


}
