"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ProductController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const product_schema_1 = require("../schemas/product.schema");
const product_service_1 = require("../services/product.service");
const logger_1 = __importDefault(require("../../../utils/logger"));
const decorator_1 = require("../../../decorator/decorator");
const helpers_1 = require("../../../utils/helpers");
const product_cache_1 = require("../../../services/redis/product.cache");
const log = (0, logger_1.default)("Product.controller");
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let text = "created";
            if (req.body._id) {
                text = "updated";
            }
            // const productId = new ObjectId();
            const uId = helpers_1.Helpers.generateId();
            yield product_service_1.productService.create(Object.assign({}, req.body));
            product_cache_1.productCache.deleteProductFromCache("/product/read");
            res
                .status(http_status_codes_1.default.CREATED)
                .json({ message: `Product ${text} successfully` });
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //check path in catch and //fetch product from cache
            //  /   /product/read
            // const prod: [] | IUserDocument[] = await productCache.getProductFromCache(
            //   "/product/read"
            // );
            // if in cache
            // if (prod?.length > 0) {
            //   log.info("entered" + prod);
            //   return res
            //     .status(HTTP_STATUS.OK)
            //     .json({ message: "fetch succesfull", data: prod });
            // }
            //if not in cache fetch fromm db
            const product = yield product_service_1.productService.find();
            // and save in catch
            // productCache.saveProductToCache(req.url, product);
            //return it to user
            res
                .status(http_status_codes_1.default.OK)
                .json({ message: "fetch succesfull", data: product });
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            product_cache_1.productCache.deleteProductFromCache("/product/read");
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            product_service_1.productService.delete(id);
            product_cache_1.productCache.deleteProductFromCache("/product/read");
            res.status(http_status_codes_1.default.OK).json({ message: "Product Deleted succesfully" });
        });
    }
}
__decorate([
    (0, decorator_1.joiValidation)(product_schema_1.productSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map