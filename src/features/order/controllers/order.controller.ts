import { orderSchema } from "../schemas/order.schema";
import HTTP_STATUS from "http-status-codes";

import { Request, Response } from "express";
import { orderService } from "../services/order.service";
import { joiValidation } from "../../../decorator/decorator";

export class OrderController {
  @joiValidation(orderSchema)
  public async create(req: Request, res: Response) {
    // store in cache
    let text = "created";
    if (req.body._id) {
      text = "updated";
    }
    const id = await orderService.create({ ...req.body });
    //  orderServices.create()

    //send result
    res.status(HTTP_STATUS.CREATED).json({
      message: `Order ${text} successfully`,
      data: { ...req.body, _id: id },
    });
  }

  public async read(req: Request, res: Response) {
    //check path in catch and //fetch product from cache
    // log.info(req.url); //   /product/read
    // const prod: [] | IUserDocument[] = await productCache.getProductFromCache(
    //   "/product/read"
    // );

    // if in cache
    // if (prod?.length > 0) {
    //   log.info("entered" + prod);
    //   return res
    //     .status(HTTP_STATUS.OK)
    //     .json({ message: "fetch succesfull", data: prod });
    // }

    //if not in cache fetch fromm db
    const order = await orderService.find();
    // and save in catch
    // productCache.saveProductToCache(req.url, product);

    //return it to user
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "fetch succesfull", data: order });
  }

  public async readUser(req: Request, res: Response) {
    //check path in catch and //fetch product from cache
    // log.info(req.url); //   /product/read
    // const prod: [] | IUserDocument[] = await productCache.getProductFromCache(
    //   "/product/read"
    // );

    // if in cache
    // if (prod?.length > 0) {
    //   log.info("entered" + prod);
    //   return res
    //     .status(HTTP_STATUS.OK)
    //     .json({ message: "fetch succesfull", data: prod });
    // }

    //if not in cache fetch fromm db
    const order = await orderService.findUser(req.params.id);
    // and save in catch
    // productCache.saveProductToCache(req.url, product);

    //return it to user
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "fetch succesfull", data: order });
  }
}
