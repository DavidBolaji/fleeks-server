import { Application } from "express";
import authRouter from "./features/auth/routes/user.router";
import { serverAdapter } from "./services/queues/base.queue";
import productRouter from "./features/products/routes/routes.product";
import orderRouter from "./features/order/routes/route.order";

const BASE_PATH = "/api/v1";

const globalRoutes = (app: Application) => {
  const routes = () => {
    // app.use("/queues", serverAdapter.getRouter());
    app.use(BASE_PATH, authRouter);
    app.use(BASE_PATH, productRouter);
    app.use(BASE_PATH, orderRouter);
  };
  routes();
};

export default globalRoutes;
