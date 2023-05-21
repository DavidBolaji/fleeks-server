import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IPaymentDocument extends Document {
  user: ObjectId;
  order: ObjectId;
  ref: string;
  status: boolean;
}
