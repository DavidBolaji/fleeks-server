"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_format_1 = __importDefault(require("bunyan-format"));
const createLoggerCustom = (name) => {
    const logger = bunyan_1.default.createLogger({
        name,
        level: "debug",
        streams: [
            {
                level: "debug",
                stream: (0, bunyan_format_1.default)({
                    outputMode: "short",
                    color: true,
                    levelInString: true,
                }),
            },
        ],
    });
    return logger;
};
exports.default = createLoggerCustom;
//# sourceMappingURL=logger.js.map