import { IProductDocument } from "../../features/products/interfaces/product.interface";
import { ServerError } from "../../utils/error/error-handler";
import createLoggerCustom from "../../utils/logger";
import { BaseCache } from "./base.cache";
import Logger from "bunyan";

const log: Logger = createLoggerCustom("productCache");

class ProductCache extends BaseCache {
  constructor() {
    super("userCache");
  }

  public async saveProductToCache(
    path: string,
    productList: IProductDocument[]
  ): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      await this.client.set(path, JSON.stringify(productList));
    } catch (err) {
      log.error(err);
      throw new ServerError("server error: " + err);
    }
  }

  public async getProductFromCache(
    path: string
  ): Promise<IProductDocument[] | []> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const products = (await this.client.get(`${path}`)) as string;

      const prodList = JSON.parse(products);

      return typeof prodList === "undefined" ? [] : prodList;
    } catch (err) {
      log.error(err);
      throw new ServerError("server error: " + err);
    }
  }

  public async deleteProductFromCache(path: string): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const products = (await this.client.del(`${path}`)) as unknown;
    } catch (err) {
      log.error(err);
      throw new ServerError("server error: " + err);
    }
  }
}

export const productCache: ProductCache = new ProductCache();
