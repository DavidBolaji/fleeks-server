import express, { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "src/middlewares/auth.middleware";

const orderRouter: Router = express.Router();

orderRouter.post(
  "/order/create",
  // authMiddleware,
  OrderController.prototype.create
);

orderRouter.get(
  "/order/read",
  // authMiddleware,
  OrderController.prototype.read
);

orderRouter.get(
  "/order/read/:id",
  // authMiddleware,
  OrderController.prototype.readUser
);

export default orderRouter;
