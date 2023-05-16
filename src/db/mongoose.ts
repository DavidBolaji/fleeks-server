import Logger from "bunyan";
import mongoose from "mongoose";
import { redisConnection } from "src/services/redis/redis.connection";

import createLoggerCustom from "src/utils/logger";

let server: any = process.env.MONGODB_URI_LOCAL;
let log: Logger = createLoggerCustom("moongoose");

if (process.env.ENV === "prod") {
  server = process.env.MONGO_URL_PROD;
}

export default () => {
  const connect = () => {
    mongoose
      .connect(server)
      .then(async () => {
        log.info("Connected to database");
        redisConnection.connect();
      })
      .catch((err) => {
        log.error("Error connecting to database", err);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on("disconnected", connect);
};
