"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object().keys({
    fname: joi_1.default.string().required().min(3).messages({
        "string.base": "First name must be of type string",
        "string.min": "Invalid first name",
        "string.empty": "Firstname is a required field",
    }),
    lname: joi_1.default.string().required().min(3).messages({
        "string.base": "Last Name must be of type string",
        "string.min": "Invalid last name",
        "string.empty": "Last Name is a required field",
    }),
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
    gender: joi_1.default.string().required().messages({
        "string.base": "Gender must be of type string",
        "string.empty": "Gender is a required field",
    }),
    phone: joi_1.default.string().required().messages({
        "string.base": "Phone number must be of type string",
        "string.empty": "Phone is a required field",
    }),
    isAdmin: joi_1.default.boolean().default(false),
});
exports.signupSchema = signupSchema;
//# sourceMappingURL=signup.schema.js.map