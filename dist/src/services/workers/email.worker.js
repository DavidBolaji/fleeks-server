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
exports.emailWorker = void 0;
const mail_transport_1 = require("../emails/mail.transport");
const logger_1 = __importDefault(require("../../utils/logger"));
const log = (0, logger_1.default)("worker");
class EmailWorker {
    sendForgotPasswordEmail(job, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rEmail, subject, body } = job.data;
                yield mail_transport_1.mailTransport.sendEmail(rEmail, subject, body);
                //   await userService.createUser(value);
                job.progress(100);
                done(null, { rEmail, subject, body });
            }
            catch (err) {
                log.error(err);
                done(err);
            }
        });
    }
    sendResetPasswordEmail(job, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rEmail, subject, body } = job.data;
                yield mail_transport_1.mailTransport.sendEmail(rEmail, subject, body);
                //   await userService.createUser(value);
                job.progress(100);
                done(null, { rEmail, subject, body });
            }
            catch (err) {
                log.error(err);
                done(err);
            }
        });
    }
}
exports.emailWorker = new EmailWorker();
//# sourceMappingURL=email.worker.js.map