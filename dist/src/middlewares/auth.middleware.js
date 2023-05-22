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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("../utils/error/error-handler");
const user_model_1 = require("../features/auth/models/user.model");
const authMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt);
    if (!((_b = req.session) === null || _b === void 0 ? void 0 : _b.jwt))
        throw new error_handler_1.NotAuthorizedError("User not authorized");
    const secret = process.env.SECRET;
    try {
        const userId = jsonwebtoken_1.default.verify((_c = req.session) === null || _c === void 0 ? void 0 : _c.jwt, secret);
        const user = (yield user_model_1.UserModel.findById(userId));
        req.user = user;
    }
    catch (err) {
        throw new error_handler_1.NotAuthorizedError("User not authorized");
    }
    next();
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map