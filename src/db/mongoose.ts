import Logger from "bunyan";

import { redisConnection } from "../services/redis/redis.connection";
import createLoggerCustom from "../utils/logger";
import mongoose from "../services/redis/experiment";
// import dotenv from "dotenv";
// dotenv.config();

let server: any = process.env.MONGODB_URI_LOCAL;
let log: Logger = createLoggerCustom("moongoose");

if (process.env.ENV === "prod") {
  server = process.env.MONGODB_URI_PROD;
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
