import { ObjectId } from "mongodb";

import { IOrderDocument } from "../interfaces/order.interface";
import { OrderModel } from "../models/order.model";
import Logger from "bunyan";
import createLoggerCustom from "../../../utils/logger";

const log: Logger = createLoggerCustom("order.service");

class OrderService {
  public async create(doc: IOrderDocument): Promise<ObjectId> {
    let id = new ObjectId();

    if (typeof doc._id !== "undefined") {
      id = doc._id;
    }

    await OrderModel.findOneAndUpdate(
      { _id: id },
      { ...doc },
      { upsert: true, new: true }
    );

    return id;
    // await product.save();
  }

  public async find(): Promise<IOrderDocument[]> {
    const order = await OrderModel.find()
      .select(
        "_id user address email price paid delivered phone status product createdAt"
      ) // @ts-ignore
      .cache({ key: "Order" });
    return order;
  }

  public async findUser(id: string): Promise<IOrderDocument[]> {
    const order = await OrderModel.find({ user: id })
      .select(
        "_id user address email price paid delivered phone status product createdAt"
      ) // @ts-ignore
      .cache({ key: id });
    return order;
  }

  public async delete(id: string): Promise<void> {
    const order = await OrderModel.findByIdAndDelete(id);
  }
}

export const orderService: OrderService = new OrderService();
