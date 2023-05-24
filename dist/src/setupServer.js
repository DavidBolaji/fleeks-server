"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavServer = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const socket_io_1 = require("socket.io");
const redis_1 = require("redis");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const http_1 = __importDefault(require("http"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const swagger_stats_1 = __importDefault(require("swagger-stats"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./utils/logger"));
const error_handler_1 = require("./utils/error/error-handler");
const notification_1 = require("./services/sockets/notification");
const PORT = process.env.PORT || 8080;
const log = (0, logger_1.default)("app");
class FavServer {
    constructor(app) {
        this.app = app;
    }
    start() {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
        process.on("uncaughtException", (err) => {
            log.error(err);
            process.exit(1);
        });
        process.on("unhandledRejection", (err) => {
            log.error(err);
            process.exit(2);
        });
    }
    securityMiddleware(app) {
        // dotenv.config({});
        let secretOne = process.env.SECRET_KEY_ONE;
        let secretTwo = process.env.SECRET_KEY_TWO;
        let environment = process.env.ENV;
        let origin = process.env.FRONT_END_URL_DEV;
        if (process.env.ENV === "prod") {
            origin = process.env.FRONT_END_URL_PROD;
        }
        // setup cors
        app.use((0, cors_1.default)({
            origin: "*",
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        }));
        // setup cookie session
        app.use((0, cookie_session_1.default)({
            name: "session",
            keys: [secretOne, secretTwo],
            maxAge: 60 * 60 * 24 * 7,
            secure: environment !== "dev",
        }));
        //setup hpp to prevent parameter pollution
        app.use((0, hpp_1.default)());
        //setup helmet
        app.use((0, helmet_1.default)());
    }
    standardMiddleware(app) {
        // compress response size
        app.use((0, compression_1.default)());
        // limit json response
        app.use((0, express_1.json)({ limit: "50mb" }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: "50mb" }));
        app.use(swagger_stats_1.default.getMiddleware({
            uriPath: "/api-stats",
        }));
    }
    routeMiddleware(app) {
        (0, routes_1.default)(app);
    }
    globalErrorHandler(app) {
        app.all("*", (req, res) => {
            res
                .status(http_status_codes_1.default.NOT_FOUND)
                .json({ message: `${req.originalUrl} not found` });
        });
        app.use((error, _req, res, next) => {
            if (error instanceof error_handler_1.customError) {
                log.error("error.message");
                return res.status(error.statusCode).json(error.serializeErrors());
            }
            else {
                log.error("error.message not");
                return res.status(error.statusCode).json(error.serializeErrors());
            }
            next();
        });
    }
    startServer(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpServer = new http_1.default.Server(app);
                const socketIO = yield this.createSocketIO(httpServer);
                this.startHttpServer(httpServer);
                this.socketIOConnections(socketIO);
            }
            catch (err) {
                log.error(err);
            }
        });
    }
    createSocketIO(httpServer) {
        return __awaiter(this, void 0, void 0, function* () {
            let origin = process.env.FRONT_END_URL;
            let redisHost = process.env.REDIS_HOST;
            const io = new socket_io_1.Server(httpServer, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                },
            });
            const pubClient = (0, redis_1.createClient)({ url: redisHost });
            const subClient = pubClient.duplicate();
            yield Promise.all([pubClient.connect(), subClient.connect()]);
            io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
            return io;
        });
    }
    startHttpServer(httpServer) {
        httpServer.listen(PORT, () => {
            log.info(`server is running on port ${PORT}`);
        });
    }
    socketIOConnections(io) {
        const notificationHandler = new notification_1.SocketIONotificationHandler(io);
        notificationHandler.listen();
    }
}
exports.FavServer = FavServer;
//# sourceMappingURL=setupServer.js.map