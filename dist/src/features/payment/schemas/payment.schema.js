"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const orderSchema = joi_1.default.object().keys({
    _id: joi_1.default.any().messages({
        "string.base": "_id product must be of type Object",
    }),
    user: joi_1.default.string().required().messages({
        "string.base": "user id must be of type string",
        "string.empty": "user id is required",
    }),
    email: joi_1.default.string().required().email().messages({
        "string.base": "Email must be of type string",
        "string.empty": "Email is a required field",
    }),
    address: joi_1.default.string().required().messages({
        "string.base": "Address must be of type string",
        "string.empty": "Address is a required field",
    }),
    product: joi_1.default.array().required().messages({
        "string.base": "Address must be of type string",
        "string.empty": "Address is a required field",
    }),
    phone: joi_1.default.string().required().messages({
        "string.base": "Phone number must be of type string",
        "string.empty": "Phone is a required field",
    }),
    price: joi_1.default.number().required().messages({
        "string.base": "Price must be of type number",
        "string.empty": "Price is a required field",
    }),
    paid: joi_1.default.boolean().required().messages({
        "string.base": "Paid field must be of type boolean",
        "string.empty": "Paid field is a required field",
    }),
    status: joi_1.default.string().required().messages({
        "string.base": "Paid field must be of type string",
        "string.empty": "Paid field is a required field",
    }),
    delivered: joi_1.default.boolean().required().messages({
        "string.base": "Delivered must be of type boolean",
        "string.empty": "Delivered is a required field",
    }),
});
exports.orderSchema = orderSchema;
//# sourceMappingURL=payment.schema.js.map