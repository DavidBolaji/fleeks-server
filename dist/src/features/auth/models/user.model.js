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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HASH_ROUNDS = 10;
const userSchema = new mongoose_1.Schema({
    uId: { type: String },
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    password: { type: String },
    gender: { type: String },
    phone: { type: String },
    email: { type: String, trim: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    passwordResetToken: { type: String, default: "" },
    passwordResetExpires: { type: Number },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield (0, bcryptjs_1.hash)(this.password, HASH_ROUNDS);
        this.password = hashPassword;
        next();
    });
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = this.password;
        return (0, bcryptjs_1.compare)(password, hashPassword);
    });
};
userSchema.methods.genAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, secret);
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
};
userSchema.methods.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcryptjs_1.hash)(password, HASH_ROUNDS);
    });
};
const UserModel = (0, mongoose_1.model)("User", userSchema, "User");
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map