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
exports.userService = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("../models/user.model");
const HASH_ROUNDS = 10;
class UserService {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.UserModel(data);
            yield user.save();
        });
    }
    findOneByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find({ passwordResetToken: token });
            return user.length > 0;
        });
    }
    findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find({ email });
            return user.length > 0;
        });
    }
    findAndReturnUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find({ email }).select("_id email uId email isAdmin fname password phone");
            return user;
        });
    }
    updatePassword(_id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pass = yield (0, bcryptjs_1.hash)(password, HASH_ROUNDS);
            const user = yield user_model_1.UserModel.findOneAndUpdate({ _id }, {
                password: pass,
                passwordResetToken: "",
                passwordResetExpires: undefined,
            }, { new: true });
        });
    }
    findOneByTokenAndExpiration(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find({
                passwordResetToken: token,
                passwordResetExpires: { $gt: Date.now() },
            });
            return user;
        });
    }
    setResetLink(email, passwordResetToken, passwordResetExpires) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOneAndUpdate({ email }, {
                passwordResetToken,
                passwordResetExpires,
            }, { new: true });
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.services.js.map