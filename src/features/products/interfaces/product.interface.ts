import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IProductDocument extends Document {
  _id: ObjectId;
  uId: string;
  title?: string;
  amount?: number;
  img?: string;
}
