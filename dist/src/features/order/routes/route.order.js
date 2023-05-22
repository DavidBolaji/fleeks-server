"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = express_1.default.Router();
orderRouter.post("/order/create", 
// authMiddleware,
order_controller_1.OrderController.prototype.create);
orderRouter.get("/order/read", 
// authMiddleware,
order_controller_1.OrderController.prototype.read);
orderRouter.get("/order/read/:id", 
// authMiddleware,
order_controller_1.OrderController.prototype.readUser);
exports.default = orderRouter;
//# sourceMappingURL=route.order.js.map