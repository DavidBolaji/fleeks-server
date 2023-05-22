"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueue = void 0;
const user_worker_1 = require("../workers/user.worker");
const base_queue_1 = require("./base.queue");
class UserQueue extends base_queue_1.BaseQueue {
    constructor() {
        super("user");
        this.processJob("addUserToDB", 4, user_worker_1.userWorker.addUserToDB);
    }
    addUserJob(name, data) {
        this.addJob(name, data);
    }
}
exports.userQueue = new UserQueue();
//# sourceMappingURL=user.queue.js.map