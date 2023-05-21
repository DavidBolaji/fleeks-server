import fs from "fs";
import ejs from "ejs";
import path from "path";

class ForgotPasswordTemplate {
  public passwordResetTemplate(username: string, resetLink: string) {
    const filePath = path.join(__dirname, "forgot-password.ejs");
    return ejs.render(fs.readFileSync(filePath, "utf8"), {
      username,
      resetLink,
      image_url:
        "https://res.cloudinary.com/dpi44zxlw/image/upload/v1684359562/logo.png",
    });
  }
}

export const forgotPasswordTemplate: ForgotPasswordTemplate =
  new ForgotPasswordTemplate();
