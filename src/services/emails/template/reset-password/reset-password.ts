import fs from "fs";
import ejs from "ejs";
import moment from "moment";
import path from "path";

class ResetPasswordTemplate {
  public passwordResetTemplate(username: string) {
    const filePath = path.join(__dirname, "reset-password.ejs");
    return ejs.render(fs.readFileSync(filePath, "utf8"), {
      username,
      email: username,
      image_url:
        "https://res.cloudinary.com/dpi44zxlw/image/upload/v1684359562/logo.png",
      date: moment().format("DD/MM/YY HH:mm:ss"),
    });
  }
}

export const resetPasswordTemplate: ResetPasswordTemplate =
  new ResetPasswordTemplate();
