import { Request, Response } from "express";
import { joiValidation } from "src/decorator";
import { productSchema } from "../schemas/product.schema";
import { ObjectId } from "mongodb";
import { Helpers } from "src/utils/helpers";
import HTTP_STATUS from "http-status-codes";
import { productService } from "../services/product.service";
import { productCache } from "src/services/redis/product.cache";
import createLoggerCustom from "src/utils/logger";
import Logger from "bunyan";
import { IUserDocument } from "src/features/auth/interfaces/user.interface";

const log: Logger = createLoggerCustom("Product.controller");

export class ProductController {
  @joiValidation(productSchema)
  public async create(req: Request, res: Response) {
    log.info(req.url);
    let text = "created";
    if (req.body._id) {
      text = "updated";
    }

    // const productId = new ObjectId();
    const uId = Helpers.generateId();

    await productService.create({ ...req.body });

    productCache.deleteProductFromCache("/product/read");

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: `Product ${text} successfully` });
  }

  public async read(req: Request, res: Response) {
    //check path in catch and //fetch product from cache
    log.info(req.url); //   /product/read
    const prod: [] | IUserDocument[] = await productCache.getProductFromCache(
      "/product/read"
    );

    // if in cache
    if (prod?.length > 0) {
      log.info("entered" + prod);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "fetch succesfull", data: prod });
    }

    //if not in cache fetch fromm db
    const product = await productService.find();
    // and save in catch
    productCache.saveProductToCache(req.url, product);

    //return it to user
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "fetch succesfull", data: product });
  }

  public async updateOne(req: Request, res: Response) {
    productCache.deleteProductFromCache("/product/read");
  }

  public async deleteOne(req: Request, res: Response) {
    const { id } = req.params;
    console.log("id: " + id);

    productService.delete(id);
    productCache.deleteProductFromCache("/product/read");

    res.status(HTTP_STATUS.OK).json({ message: "Product Deleted succesfully" });
  }
}
