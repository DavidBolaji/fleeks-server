import fs from "fs";
import ejs from "ejs";

class ForgotPasswordTemplate {
  public passwordResetTemplate(username: string, resetLink: string) {
    return ejs.render(
      fs.readFileSync(__dirname + "/forgot-password.ejs", "utf8"),
      {
        username,
        resetLink,
        image_url:
          "https://res.cloudinary.com/dpi44zxlw/image/upload/v1684359562/logo.png",
      }
    );
  }
}

export const forgotPasswordTemplate: ForgotPasswordTemplate =
  new ForgotPasswordTemplate();
