// @ts-nocheck
import Logger from "bunyan";
import mongoose, { Query } from "mongoose";
import createLoggerCustom from "../../utils/logger";
import { createClient } from "redis";

let redisHost: any = process.env.REDIS_HOST;
const client = createClient({ url: redisHost });

const exec = mongoose.Query.prototype.exec;
const log: Logger = createLoggerCustom("cache middle");

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function (...args) {
  log.info("Executing");

  if (!this.useCache) {
    return exec.apply(this, ...args);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.model.collection.name,
    })
  );

  if (!client.isOpen) {
    await client.connect();
  }

  const cached = await client.hGet(this.hashKey, key);

  if (!cached) {
    const result = await exec.apply(this, ...args);

    client.hSet(this.hashKey, key, JSON.stringify(result));
    //   log.info("Result: " + result);
    return result;
  }

  const doc = JSON.parse(cached);

  return Array.isArray(doc)
    ? doc.map((e) => new this.model(e))
    : new this.model(doc);
};

export default mongoose;

export const clearHash = (hashKey) => {
  client.del(JSON.stringify(hashKey));
};
