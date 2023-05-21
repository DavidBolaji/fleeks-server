import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import { IProductDocument } from "../../products/interfaces/product.interface";

export interface IOrderDocument extends Document {
  user: ObjectId;
  email: string;
  phone: string;
  address: string;
  product: IProductDocument[];
  price: number;
  status: string;
  paid: boolean;
  delivered: boolean;
}
