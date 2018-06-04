export class Invitation {

  _id: string;
  senderId: string;
  dateCreated: Date = new Date();
  jarId: string;
  //email not in use until GDPR determined
  recipientEmailAddress: string;
  senderMembershipLevel: number;
  emailSentDate: number[];
  reminderSentDate: number[];
  acceptedDate: Date = new Date();
  rejectDate: Date = new Date();
  status: string;

  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}

