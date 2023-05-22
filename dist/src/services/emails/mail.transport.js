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
exports.mailTransport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const logger_1 = __importDefault(require("../../utils/logger"));
const error_handler_1 = require("../../utils/error/error-handler");
const log = (0, logger_1.default)("mail.transport");
const key = process.env.SENDGRID_API_KEY;
const sEmail = process.env.SENDER_EMAIL;
const sPass = process.env.SENDER_PASSWORD;
mail_1.default.setApiKey(key);
class MailTransport {
    sendEmail(rEmail, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.ENV === "dev") {
                console.log("dev");
                return this.devEmailSender(rEmail, subject, body);
            }
            console.log("prod");
            return yield this.prodEmailSender(rEmail, subject, body);
        });
    }
    devEmailSender(rEmail, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: sEmail,
                    pass: sPass,
                },
            });
            const mailOptions = {
                from: `FavFleeks App <${sEmail}>`,
                to: `FavFleeks App <${rEmail}>`,
                subject,
                html: body,
            };
            try {
                yield transporter.sendMail(mailOptions);
                log.info("production email sent");
            }
            catch (error) {
                log.error("error sending email" + error);
                throw new error_handler_1.BadRequestError("Error sending email");
            }
        });
    }
    prodEmailSender(rEmail, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: `FavFleeks App <${sEmail}>`,
                to: `FavFleeks App <${rEmail}>`,
                subject,
                html: body,
            };
            try {
                yield mail_1.default.send(mailOptions);
                log.info("production email sent");
            }
            catch (error) {
                log.error("error sending email" + error);
                throw new error_handler_1.BadRequestError("Error sending email");
            }
        });
    }
}
exports.mailTransport = new MailTransport();
//# sourceMappingURL=mail.transport.js.map