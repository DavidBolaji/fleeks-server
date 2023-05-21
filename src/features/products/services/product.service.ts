import { ObjectId } from "mongodb";
import { IProductDocument } from "../interfaces/product.interface";
import { ProductModel } from "../models/product.model";

class ProductService {
  public async create(doc: IProductDocument): Promise<void> {
    let id = new ObjectId();

    if (typeof doc._id !== "undefined") {
      id = doc._id;
    }

    const product = await ProductModel.findOneAndUpdate(
      { _id: id },
      { ...doc },
      { upsert: true, new: true }
    );
    // await product.save();
  }

  public async find(): Promise<IProductDocument[]> {
    const product = await ProductModel.find();
    return product;
  }

  public async delete(id: string): Promise<void> {
    const product = await ProductModel.findByIdAndDelete(id);
  }
}

export const productService: ProductService = new ProductService();
