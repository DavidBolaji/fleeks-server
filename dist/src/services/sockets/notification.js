"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIONotificationHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
let socIOObjNotHan;
class SocketIONotificationHandler {
    constructor(io) {
        this.io = io;
        socIOObjNotHan = io;
        this.log = (0, logger_1.default)("Notification.ts");
    }
    listen() {
        this.io.on("connection", (socket) => {
            this.log.info("Notification socket handler");
        });
    }
}
exports.SocketIONotificationHandler = SocketIONotificationHandler;
//# sourceMappingURL=notification.js.map