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
exports.userCache = void 0;
const base_cache_1 = require("./base.cache");
const logger_1 = __importDefault(require("../../utils/logger"));
const error_handler_1 = require("../../utils/error/error-handler");
const log = (0, logger_1.default)("userCache");
class UserCache extends base_cache_1.BaseCache {
    constructor() {
        super("userCache");
    }
    saveUserToCache(key, id, cretedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const { _id, fname, lname, phone, password, email, gender, isAdmin } = cretedUser;
            const result = {
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
                    yield this.client.connect();
                }
                yield this.client.ZADD("user", {
                    score: parseInt(id, 10),
                    value: `${key}`,
                });
                for (const val in result) {
                    const res = result[val];
                    yield this.client.hSet(`users:${key}`, val, res);
                }
            }
            catch (err) {
                log.error(err);
                throw new error_handler_1.ServerError("server error: " + err);
            }
        });
    }
    getUserFromCache(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                const user = (yield this.client.HGETALL(`users:${id}`));
                return user;
            }
            catch (err) {
                log.error(err);
                throw new error_handler_1.ServerError("server error: " + err);
            }
        });
    }
}
exports.userCache = new UserCache();
//# sourceMappingURL=user.cache.js.map