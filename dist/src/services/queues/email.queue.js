"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
const email_worker_1 = require("../workers/email.worker");
const base_queue_1 = require("./base.queue");
class EmailQueue extends base_queue_1.BaseQueue {
    constructor() {
        super("email");
        this.processJob("forgotPasswordEmail", 2, email_worker_1.emailWorker.sendForgotPasswordEmail);
        this.processJob("resetPasswordEmail", 2, email_worker_1.emailWorker.sendResetPasswordEmail);
    }
    addEmailJob(name, data) {
        this.addJob(name, data);
    }
}
exports.emailQueue = new EmailQueue();
//# sourceMappingURL=email.queue.js.map