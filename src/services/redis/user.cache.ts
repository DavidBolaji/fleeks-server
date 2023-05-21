import { BaseCache } from "./base.cache";
import Logger from "bunyan";

import { ObjectId } from "mongodb";
import { IUserDocument } from "../../features/auth/interfaces/user.interface";
import createLoggerCustom from "../../utils/logger";
import { ServerError } from "../../utils/error/error-handler";

const log: Logger = createLoggerCustom("userCache");

class UserCache extends BaseCache {
  constructor() {
    super("userCache");
  }

  public async saveUserToCache(
    key: ObjectId,
    id: string,
    cretedUser: IUserDocument
  ): Promise<void> {
    const createdAt: Date = new Date();
    const { _id, fname, lname, phone, password, email, gender, isAdmin } =
      cretedUser;

    const result: any = {
      _id: `${_id}`,
      fname: `${fname}`,
      lname: `${lname}`,
      gender: `${gender}`,
      phone: `${phone}`,
      email: `${email}`,
      password: `${password}`,
      isAdmin: `${isAdmin}`,
      createdAt: `${createdAt}`,
    };

    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      await this.client.ZADD("user", {
        score: parseInt(id, 10),
        value: `${key}`,
      });

      for (const val in result) {
        const res: any = result[val];
        await this.client.hSet(`users:${key}`, val, res);
      }
    } catch (err) {
      log.error(err);
      throw new ServerError("server error: " + err);
    }
  }

  public async getUserFromCache(id: ObjectId): Promise<IUserDocument | null> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }

      const user = (await this.client.HGETALL(
        `users:${id}`
      )) as unknown as IUserDocument;
      return user;
    } catch (err) {
      log.error(err);
      throw new ServerError("server error: " + err);
    }
  }
}

export const userCache: UserCache = new UserCache();
