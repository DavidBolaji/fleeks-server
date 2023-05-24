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
exports.clearHash = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../../utils/logger"));
const redis_1 = require("redis");
let redisHost = process.env.REDIS_HOST;
const client = (0, redis_1.createClient)({ url: redisHost });
const exec = mongoose_1.default.Query.prototype.exec;
const log = (0, logger_1.default)("cache middle");
mongoose_1.default.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || "");
    return this;
};
mongoose_1.default.Query.prototype.exec = function (...args) {
    return __awaiter(this, void 0, void 0, function* () {
        log.info("Executing");
        if (!this.useCache) {
            return exec.apply(this, ...args);
        }
        const key = JSON.stringify(Object.assign({}, this.getQuery(), {
            collection: this.model.collection.name,
        }));
        if (!client.isOpen) {
            yield client.connect();
        }
        const cached = yield client.hGet(this.hashKey, key);
        if (!cached) {
            const result = yield exec.apply(this, ...args);
            client.hSet(this.hashKey, key, JSON.stringify(result));
            //   log.info("Result: " + result);
            return result;
        }
        const doc = JSON.parse(cached);
        return Array.isArray(doc)
            ? doc.map((e) => new this.model(e))
            : new this.model(doc);
    });
};
exports.default = mongoose_1.default;
const clearHash = (hashKey) => {
    client.del(JSON.stringify(hashKey));
};
exports.clearHash = clearHash;
//# sourceMappingURL=experiment.js.map