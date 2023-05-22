"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authRouter = express_1.default.Router();
authRouter.post("/signup", user_controller_1.UserController.prototype.signup);
authRouter.post("/signin", user_controller_1.UserController.prototype.signin);
authRouter.get("/signout", user_controller_1.UserController.prototype.signout);
authRouter.post("/forgot", user_controller_1.UserController.prototype.forgot);
authRouter.post("/token", user_controller_1.UserController.prototype.token);
authRouter.post("/reset", user_controller_1.UserController.prototype.reset);
exports.default = authRouter;
//# sourceMappingURL=user.router.js.map