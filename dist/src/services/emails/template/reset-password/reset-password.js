"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
class ResetPasswordTemplate {
    passwordResetTemplate(username) {
        const filePath = path_1.default.join(__dirname, "reset-password.ejs");
        return ejs_1.default.render(fs_1.default.readFileSync(filePath, "utf8"), {
            username,
            email: username,
            image_url: "https://res.cloudinary.com/dpi44zxlw/image/upload/v1684359562/logo.png",
            date: (0, moment_1.default)().format("DD/MM/YY HH:mm:ss"),
        });
    }
}
exports.resetPasswordTemplate = new ResetPasswordTemplate();
//# sourceMappingURL=reset-password.js.map