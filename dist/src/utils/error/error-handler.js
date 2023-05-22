"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.FileTooLargeError = exports.ServerError = exports.NotAuthorizedError = exports.NotFoundError = exports.BadRequestError = exports.customError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class customError extends Error {
    constructor(message) {
        super(message);
    }
    serializeErrors() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
        };
    }
}
exports.customError = customError;
class BadRequestError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
        this.status = "error";
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.NOT_FOUND;
        this.status = "error";
    }
}
exports.NotFoundError = NotFoundError;
class NotAuthorizedError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.UNAUTHORIZED;
        this.status = "error";
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
class ServerError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.SERVICE_UNAVAILABLE;
        this.status = "error";
    }
}
exports.ServerError = ServerError;
class FileTooLargeError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.REQUEST_TOO_LONG;
        this.status = "error";
    }
}
exports.FileTooLargeError = FileTooLargeError;
class ValidationError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.default.BAD_REQUEST;
        this.status = "error";
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=error-handler.js.map