"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const redis_connection_1 = require("../services/redis/redis.connection");
const logger_1 = __importDefault(require("../utils/logger"));
// import dotenv from "dotenv";
// dotenv.config();
let server = process.env.MONGODB_URI_LOCAL;
let log = (0, logger_1.default)("moongoose");
if (process.env.ENV === "prod") {
    server = process.env.MONGODB_URI_PROD;
}
exports.default = () => {
    const connect = () => {
        mongoose_1.default
            .connect(server)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            log.info("Connected to database");
            redis_connection_1.redisConnection.connect();
        }))
            .catch((err) => {
            log.error("Error connecting to database", err);
            return process.exit(1);
        });
    };
    connect();
    mongoose_1.default.connection.on("disconnected", connect);
};
//# sourceMappingURL=mongoose.js.map