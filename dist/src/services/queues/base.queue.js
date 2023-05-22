"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueue = exports.serverAdapter = void 0;
const bull_1 = __importDefault(require("bull"));
const api_1 = require("@bull-board/api");
const bullAdapter_1 = require("@bull-board/api/bullAdapter");
const express_1 = require("@bull-board/express");
const logger_1 = __importDefault(require("../../utils/logger"));
{ /* prettier-ignore */ }
// type IBaseJobData = IAuthJob;
let bullAdapters = [];
exports.serverAdapter = express_1.ExpressAdapter;
class BaseQueue {
    constructor(queueName) {
        const redis = process.env.REDIS_HOST;
        this.queue = new bull_1.default(queueName, redis);
        bullAdapters.push(new bullAdapter_1.BullAdapter(this.queue));
        bullAdapters = [...new Set(bullAdapters)];
        exports.serverAdapter = new express_1.ExpressAdapter();
        exports.serverAdapter.setBasePath("/queues");
        (0, api_1.createBullBoard)({
            queues: bullAdapters,
            serverAdapter: exports.serverAdapter,
        });
        this.log = (0, logger_1.default)(queueName + "Queue");
        this.queue.on("completed", (job) => {
            job.remove();
            this.log.info("Queue completed");
        });
        this.queue.on("global:completed", (jobId) => {
            this.log.info(`job id: ${jobId} completed`);
        });
        this.queue.on("global:stalled", (jobId) => {
            this.log.info(`job id: ${jobId} is stalled`);
        });
    }
    addJob(name, data) {
        this.queue.add(name, data, {
            attempts: 2,
            backoff: { type: "fixed", delay: 10000 },
        });
    }
    processJob(name, concurrency, cb) {
        this.queue.process(name, concurrency, cb);
    }
}
exports.BaseQueue = BaseQueue;
//# sourceMappingURL=base.queue.js.map