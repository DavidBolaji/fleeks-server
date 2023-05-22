"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class ForgotPasswordTemplate {
    passwordResetTemplate(username, resetLink) {
        const filePath = path_1.default.join(__dirname, "forgot-password.ejs");
        return ejs_1.default.render(fs_1.default.readFileSync(filePath, "utf8"), {
            username,
            resetLink,
            image_url: "https://res.cloudinary.com/dpi44zxlw/image/upload/v1684359562/logo.png",
        });
    }
}
exports.forgotPasswordTemplate = new ForgotPasswordTemplate();
//# sourceMappingURL=forgot-password.js.map