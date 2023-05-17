import { Document } from "mongoose";
import { ObjectId } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument | null;
    }
  }
}

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
