"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signinSchema = joi_1.default.object().keys({
    password: joi_1.default.string().required().min(8).messages({
        "string.base": "Password must be of type string",
        "string.min": "Invalid password",
        "string.empty": "Password is a required field",
    }),
    email: joi_1.default.string().required().email().messages({
        "string.base": "Email must be of type string",
        "string.min": "Invalid password",
        "string.empty": "Email is a required field",
    }),
});
exports.signinSchema = signinSchema;
//# sourceMappingURL=signin.schema.js.map