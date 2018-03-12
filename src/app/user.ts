export class User {

  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number

  constructor(values: Object ={}){
    Object.assign(this, values);
  }
}
