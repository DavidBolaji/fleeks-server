"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const error_handler_1 = require("./error-handler");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const globalErrorHandler = (app) => {
    app.all("*", (req, res) => {
        res
            .status(http_status_codes_1.default.NOT_FOUND)
            .json({ message: `${req.originalUrl} not found` });
    });
    app.use((error, _req, res, next) => {
        console.log(error);
        if (error instanceof error_handler_1.customError) {
            return res.status(error.statusCode).json(error.serializeErrors());
        }
        next();
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=errors.js.map