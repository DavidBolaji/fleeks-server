"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UserController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("../../../utils/logger"));
const signup_schema_1 = require("../schema/signup.schema");
const decorator_1 = require("../../../decorator/decorator");
const signin_schema_1 = require("../schema/signin.schema");
const user_services_1 = require("../services/user.services");
const forgot_schema_1 = require("../schema/forgot.schema");
// import { forgotPasswordTemplate } from "../../../services/emails/template/forgot-password/forgot-password";
// import { emailQueue } from "../../../services/queues/email.queue";
const reset_schema_1 = require("../schema/reset.schema");
// import { resetPasswordTemplate } from "../../../services/emails/template/reset-password/reset-password";
const helpers_1 = require("../../../utils/helpers");
// import { userCache } from "../../../services/redis/user.cache";
// import { userQueue } from "../../../services/queues/user.queue";
// import { mailTransport } from "../../../services/emails/mail.transport";
const log = (0, logger_1.default)("user.controller");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // store in cache
            const userExists = yield user_services_1.userService.findOne(req.body.email);
            if (userExists) {
                return res.status(http_status_codes_1.default.CONFLICT).json({
                    message: "User already exists",
                    statusCode: http_status_codes_1.default.CONFLICT,
                    status: "error",
                });
            }
            const _id = new mongodb_1.ObjectId();
            const uId = String(helpers_1.Helpers.generateId());
            //save user in cache
            const value = Object.assign({ _id, uId }, req.body);
            // await userCache.saveUserToCache(_id, uId, { _id, ...req.body });
            //start worker to save user in db
            // userQueue.addUserJob("addUserToDB", { value: { _id, uId, ...req.body } });
            yield user_services_1.userService.createUser(value);
            const token = UserController.prototype.signupToken(_id);
            req.session = { jwt: token };
            //send result
            res.status(http_status_codes_1.default.CREATED).json({
                message: "User created successfully",
                data: Object.assign({ _id, uId }, req.body),
            });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.userService.findAndReturnUser(req.body.email);
            if (user.length < 1) {
                return res.status(http_status_codes_1.default.NOT_FOUND).json({
                    message: "Wrong email or password",
                    statusCode: http_status_codes_1.default.CONFLICT,
                    status: "error",
                });
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(req.body.password, user[0].password);
            if (!passwordMatch) {
                return res.status(http_status_codes_1.default.NOT_FOUND).json({
                    message: "Wrong email or password",
                    statusCode: http_status_codes_1.default.CONFLICT,
                    status: "error",
                });
            }
            const token = UserController.prototype.signupToken(user[0]._id);
            req.session = { jwt: token };
            res.status(http_status_codes_1.default.OK).json({
                message: "Sign in successfull",
                data: Object.assign({}, user[0]._doc),
            });
        });
    }
    signout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session = null;
            res.status(http_status_codes_1.default.OK).json({
                message: "Signout successfull",
                data: {},
            });
        });
    }
    forgot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_services_1.userService.findOne(req.body.email);
            if (!userExists) {
                return res.status(http_status_codes_1.default.CONFLICT).json({
                    message: "wrong email",
                    statusCode: http_status_codes_1.default.CONFLICT,
                    status: "error",
                });
            }
            const randomToStrings = (0, uuid_1.v4)();
            yield user_services_1.userService.setResetLink(req.body.email, randomToStrings, Date.now() * 60 * 60 * 1000);
            // let origin: any = process.env.FRONT_END_URL_DEV;
            let origin = process.env.FRONT_END_URL_PROD;
            if (process.env.ENV === "prod") {
                origin = process.env.FRONT_END_URL_PROD;
            }
            const resetLink = `${origin}/${randomToStrings}`;
            // const body: string = forgotPasswordTemplate.passwordResetTemplate(
            //   req.body.email,
            //   resetLink
            // );
            // await mailTransport.sendEmail(req.body.email, "Reset your password", body);
            // emailQueue.addEmailJob("forgotPasswordEmail", {
            //   rEmail: req.body.email,
            //   subject: "Reset your password",
            //   body,
            // });
            res.status(http_status_codes_1.default.OK).json({
                message: "Password reset email sent",
                data: { link: resetLink },
            });
        });
    }
    reset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_services_1.userService.findOneByTokenAndExpiration(req.body.token);
            if (userExists.length < 1) {
                return res.status(http_status_codes_1.default.CONFLICT).json({
                    message: "Token expired",
                    statusCode: http_status_codes_1.default.NOT_FOUND,
                    status: "error",
                });
            }
            yield user_services_1.userService.updatePassword(userExists[0]._id, req.body.password);
            // const body: string = resetPasswordTemplate.passwordResetTemplate(
            //   userExists[0].email!
            // );
            // emailQueue.addEmailJob("resetPasswordEmail", {
            //   rEmail: userExists[0].email!,
            //   subject: "Password Reset Confirmation",
            //   body,
            // });
            // await mailTransport.sendEmail(
            //   userExists[0].email!,
            //   "Password Reset Confirmation",
            //   body
            // );
            res.status(http_status_codes_1.default.OK).json({ message: "Password change successfull" });
        });
    }
    token(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_services_1.userService.findOneByToken(req.body.token);
            if (!userExists) {
                return res.status(http_status_codes_1.default.CONFLICT).json({
                    message: "Authentication failed",
                    statusCode: http_status_codes_1.default.NOT_FOUND,
                    status: "error",
                });
            }
            res.status(http_status_codes_1.default.OK).json({ message: "Authentication successfull" });
        });
    }
    signupToken(id) {
        const token = process.env.SECRET;
        return jsonwebtoken_1.default.sign({ _id: id.toString() }, token);
    }
}
__decorate([
    (0, decorator_1.joiValidation)(signup_schema_1.signupSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, decorator_1.joiValidation)(signin_schema_1.signinSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signin", null);
__decorate([
    (0, decorator_1.joiValidation)(forgot_schema_1.forgotSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgot", null);
__decorate([
    (0, decorator_1.joiValidation)(reset_schema_1.resetSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reset", null);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map