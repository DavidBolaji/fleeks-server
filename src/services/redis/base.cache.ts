import Logger from "bunyan";
import { createClient } from "redis";
import createLoggerCustom from "../../utils/logger";

export type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseCache {
  client: RedisClient;
  log: Logger;

  constructor(cacheName: string) {
    this.client = createClient({ url: process.env.REDIS_HOST });
    this.log = createLoggerCustom(cacheName);
  }

  private cacheError(): void {
    this.client.on("error", (err: unknown) => {
      this.log.error(err);
    });
  }
}
