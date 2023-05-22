"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    img: { type: String },
    amount: { type: Number },
}, {
    timestamps: true,
});
const ProductModel = (0, mongoose_1.model)("Product", productSchema, "Product");
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.model.js.map