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
  jarOwnerJarId: string;
  //memberships [jarId, membershiplevel]
  jarMemberships: [string, number];
  //the jar either created or first joined
  primaryJarId: string;
  //to add a direct relationship to someone who is alreday a member
  friends: string[];

  exp: number;
  iat: number;

  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
