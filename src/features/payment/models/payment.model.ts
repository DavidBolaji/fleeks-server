import mongoose, { model, Model, Schema } from "mongoose";
import { IPaymentDocument } from "../interfaces/payment.interface";
// import { IProductDocument } from "../interfaces/product.interface";

const paymentSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    order: { type: String },
    ref: { type: String },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const PaymentModel: Model<IPaymentDocument> = model<IPaymentDocument>(
  "Payment",
  paymentSchema,
  "Payment"
);

export { PaymentModel };
