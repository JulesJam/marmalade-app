export class Invitation {

  _id: string;
  senderId: string;
  dateCreated: Date = new Date();
  jarId: string;
  branchCode: string;
  //email not in use until GDPR determined
  recipientEmailAddress: string;
  recipientFirstName: string;
  senderMembershipLevel: number;
  emailSentDate: number[];
  reminderSentDate: number[];
  acceptedDate: Date;
  rejectDate: Date;
  status: string;

  constructor(values: Object ={}){
    Object.assign(this, values);
  };
}

