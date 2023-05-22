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
exports.redisConnection = void 0;
const base_cache_1 = require("./base.cache");
const logger_1 = __importDefault(require("../../utils/logger"));
const log = (0, logger_1.default)("redisConnection");
class RedisConnection extends base_cache_1.BaseCache {
    constructor() {
        super("redisConnection");
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const res = yield this.client.ping();
                log.info(res);
            }
            catch (err) {
                log.error(err);
            }
        });
    }
}
exports.redisConnection = new RedisConnection();
//# sourceMappingURL=redis.connection.js.map