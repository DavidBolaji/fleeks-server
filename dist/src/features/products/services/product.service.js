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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const mongodb_1 = require("mongodb");
const product_model_1 = require("../models/product.model");
class ProductService {
    create(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = new mongodb_1.ObjectId();
            if (typeof doc._id !== "undefined") {
                id = doc._id;
            }
            const product = yield product_model_1.ProductModel.findOneAndUpdate({ _id: id }, Object.assign({}, doc), { upsert: true, new: true });
            // await product.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const product = yield product_model_1.ProductModel.find().cache({ key: "/product/read" });
            return product;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel.findByIdAndDelete(id);
        });
    }
}
exports.productService = new ProductService();
//# sourceMappingURL=product.service.js.map