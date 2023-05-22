"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = __importDefault(require("./features/auth/routes/user.router"));
const routes_product_1 = __importDefault(require("./features/products/routes/routes.product"));
const route_order_1 = __importDefault(require("./features/order/routes/route.order"));
const BASE_PATH = "/api/v1";
const globalRoutes = (app) => {
    const routes = () => {
        // app.use("/queues", serverAdapter.getRouter());
        app.use(BASE_PATH, user_router_1.default);
        app.use(BASE_PATH, routes_product_1.default);
        app.use(BASE_PATH, route_order_1.default);
    };
    routes();
};
exports.default = globalRoutes;
//# sourceMappingURL=routes.js.map