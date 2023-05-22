"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCache = void 0;
const redis_1 = require("redis");
const logger_1 = __importDefault(require("../../utils/logger"));
class BaseCache {
    constructor(cacheName) {
        this.client = (0, redis_1.createClient)({ url: process.env.REDIS_HOST });
        this.log = (0, logger_1.default)(cacheName);
    }
    cacheError() {
        this.client.on("error", (err) => {
            this.log.error(err);
        });
    }
}
exports.BaseCache = BaseCache;
//# sourceMappingURL=base.cache.js.map