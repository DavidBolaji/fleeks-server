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
exports.OrderController = void 0;
const order_schema_1 = require("../schemas/order.schema");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const order_service_1 = require("../services/order.service");
const decorator_1 = require("../../../decorator/decorator");
const experiment_1 = require("../../../services/redis/experiment");
class OrderController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // store in cache
            let text = "created";
            if (req.body._id) {
                text = "updated";
            }
            const id = yield order_service_1.orderService.create(Object.assign({}, req.body));
            //  orderServices.create()
            //send result
            res.status(http_status_codes_1.default.CREATED).json({
                message: `Order ${text} successfully`,
                data: Object.assign(Object.assign({}, req.body), { _id: id }),
            });
            (0, experiment_1.clearHash)(req.body.user);
            (0, experiment_1.clearHash)("Order");
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //check path in catch and //fetch product from cache
            // log.info(req.url); //   /product/read
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
            const order = yield order_service_1.orderService.find();
            // and save in catch
            // productCache.saveProductToCache(req.url, product);
            //return it to user
            res
                .status(http_status_codes_1.default.OK)
                .json({ message: "fetch succesfull", data: order });
        });
    }
    readUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //if not in cache fetch fromm db
            const order = yield order_service_1.orderService.findUser(req.params.id);
            // and save in catch
            // productCache.saveProductToCache(req.url, product);
            //return it to user
            res
                .status(http_status_codes_1.default.OK)
                .json({ message: "fetch succesfull", data: order });
        });
    }
}
__decorate([
    (0, decorator_1.joiValidation)(order_schema_1.orderSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map