import mongoose, { model, Model, Schema } from "mongoose";
import { IOrderDocument } from "../interfaces/order.interface";
// import { IProductDocument } from "../interfaces/product.interface";

const orderSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    product: { type: Array },
    price: { type: Number },
    status: { type: String },
    paid: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrderDocument> = model<IOrderDocument>(
  "Order",
  orderSchema,
  "Order"
);

export { OrderModel };
