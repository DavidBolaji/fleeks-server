import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IUserDocument extends Document {
  _id: ObjectId;
  uId: string;
  fname?: string;
  lname?: string;
  gender?: string;
  phone?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}
