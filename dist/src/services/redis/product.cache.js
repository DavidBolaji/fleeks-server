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
exports.productCache = void 0;
const error_handler_1 = require("../../utils/error/error-handler");
const logger_1 = __importDefault(require("../../utils/logger"));
const base_cache_1 = require("./base.cache");
const log = (0, logger_1.default)("productCache");
class ProductCache extends base_cache_1.BaseCache {
    constructor() {
        super("userCache");
    }
    saveProductToCache(path, productList) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                yield this.client.set(path, JSON.stringify(productList));
            }
            catch (err) {
                log.error(err);
                throw new error_handler_1.ServerError("server error: " + err);
            }
        });
    }
    getProductFromCache(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                const products = (yield this.client.get(`${path}`));
                const prodList = JSON.parse(products);
                return typeof prodList === "undefined" ? [] : prodList;
            }
            catch (err) {
                log.error(err);
                throw new error_handler_1.ServerError("server error: " + err);
            }
        });
    }
    deleteProductFromCache(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client.isOpen) {
                    yield this.client.connect();
                }
                const products = (yield this.client.del(`${path}`));
            }
            catch (err) {
                log.error(err);
                throw new error_handler_1.ServerError("server error: " + err);
            }
        });
    }
}
exports.productCache = new ProductCache();
//# sourceMappingURL=product.cache.js.map