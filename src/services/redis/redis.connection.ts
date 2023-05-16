import Logger from "bunyan";
import { BaseCache } from "./base.cache";
import createLoggerCustom from "src/utils/logger";

const log: Logger = createLoggerCustom("redisConnection");

class RedisConnection extends BaseCache {
  constructor() {
    super("redisConnection");
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      const res = await this.client.ping();
      log.info(res);
    } catch (err) {
      log.error(err);
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
