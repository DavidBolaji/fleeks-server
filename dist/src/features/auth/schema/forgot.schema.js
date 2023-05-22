"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const forgotSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().email().messages({
        "string.base": "Email must be of type string",
        "string.min": "Invalid password",
        "string.empty": "Email is a required field",
    }),
});
exports.forgotSchema = forgotSchema;
//# sourceMappingURL=forgot.schema.js.map