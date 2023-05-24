import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import Logger from "bunyan";

import { productSchema } from "../schemas/product.schema";
import { productService } from "../services/product.service";
import createLoggerCustom from "../../../utils/logger";
import { joiValidation } from "../../../decorator/decorator";
import { productCache } from "../../../services/redis/product.cache";
import { clearHash } from "../../../services/redis/experiment";

const log: Logger = createLoggerCustom("Product.controller");

export class ProductController {
  @joiValidation(productSchema)
  public async create(req: Request, res: Response) {
    let text = "created";
    if (req.body._id) {
      text = "updated";
    }

    await productService.create({ ...req.body });

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: `Product ${text} successfully`, data: {} });

    clearHash("/product/read");
  }

  public async read(req: Request, res: Response) {
    const product = await productService.find();

    res
      .status(HTTP_STATUS.OK)
      .json({ message: "fetch succesfull", data: product });
  }

  public async updateOne(req: Request, res: Response) {
    productCache.deleteProductFromCache("/product/read");
  }

  public async deleteOne(req: Request, res: Response) {
    const { id } = req.params;

    productService.delete(id);
    productCache.deleteProductFromCache("/product/read");

    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Product Deleted succesfully", data: { _id: id } });

    clearHash("/product/read");
  }
}
