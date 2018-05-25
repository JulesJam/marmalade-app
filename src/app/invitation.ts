export class Invitation {

  _id: string;
  senderId: string;
  dateCreated: Date = new Date();
  jarId: string;
  senderMembershipLevel: number;
  emailSentDate: number[];
  reminderSentDate: number[];
  acceptedDate: Date = new Date();
  rejectDate: Date = new Date();

  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}

