import express, { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter: Router = express.Router();

productRouter.post("/product/create", ProductController.prototype.create);
productRouter.get("/product/read", ProductController.prototype.read);
productRouter.put("/product/update/:id", ProductController.prototype.updateOne);
productRouter.delete(
  "/product/delete/:id",
  ProductController.prototype.deleteOne
);

export default productRouter;
