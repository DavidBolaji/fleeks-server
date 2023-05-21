import express, { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter: Router = express.Router();

productRouter.post(
  "/product/create",
  // authMiddleware,
  ProductController.prototype.create
);
productRouter.get("/product/read", ProductController.prototype.read);
productRouter.put(
  "/product/update/:id",
  // authMiddleware,
  ProductController.prototype.updateOne
);
productRouter.delete(
  "/product/delete/:id",
  // authMiddleware,
  ProductController.prototype.deleteOne
);

export default productRouter;
