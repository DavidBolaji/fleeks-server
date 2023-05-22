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
exports.orderService = void 0;
const mongodb_1 = require("mongodb");
const order_model_1 = require("../models/order.model");
const logger_1 = __importDefault(require("../../../utils/logger"));
const log = (0, logger_1.default)("order.service");
class OrderService {
    create(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = new mongodb_1.ObjectId();
            if (typeof doc._id !== "undefined") {
                id = doc._id;
            }
            yield order_model_1.OrderModel.findOneAndUpdate({ _id: id }, Object.assign({}, doc), { upsert: true, new: true });
            return id;
            // await product.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.find().select("_id user address email price paid delivered phone status product");
            return order;
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.find({ user: id }).select("_id user address email price paid delivered phone status product");
            return order;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.OrderModel.findByIdAndDelete(id);
        });
    }
}
exports.orderService = new OrderService();
//# sourceMappingURL=order.service.js.map