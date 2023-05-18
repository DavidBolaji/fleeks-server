import mongoose, { model, Model, Schema } from "mongoose";
import { IProductDocument } from "../interfaces/product.interface";

const productSchema: Schema = new Schema(
  {
    title: { type: String, trim: true },
    img: { type: String },
    amount: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ProductModel: Model<IProductDocument> = model<IProductDocument>(
  "Product",
  productSchema,
  "Product"
);

export { ProductModel };
