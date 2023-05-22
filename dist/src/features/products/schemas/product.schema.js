"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object().keys({
    _id: joi_1.default.any().messages({
        "string.base": "_id product must be of type Object",
    }),
    title: joi_1.default.string().required().messages({
        "string.base": "Title for product must be of type string",
        "string.empty": "Title for product is a required field",
    }),
    amount: joi_1.default.number().required().messages({
        "string.base": "Amount must be of type Number",
        "string.empty": "Amount is a required field",
    }),
    img: joi_1.default.string().messages({
        "string.base": "Image must be of type string",
    }),
});
exports.productSchema = productSchema;
//# sourceMappingURL=product.schema.js.map