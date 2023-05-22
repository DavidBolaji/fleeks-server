"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const productRouter = express_1.default.Router();
productRouter.post("/product/create", 
// authMiddleware,
product_controller_1.ProductController.prototype.create);
productRouter.get("/product/read", product_controller_1.ProductController.prototype.read);
productRouter.put("/product/update/:id", 
// authMiddleware,
product_controller_1.ProductController.prototype.updateOne);
productRouter.delete("/product/delete/:id", 
// authMiddleware,
product_controller_1.ProductController.prototype.deleteOne);
exports.default = productRouter;
//# sourceMappingURL=routes.product.js.map