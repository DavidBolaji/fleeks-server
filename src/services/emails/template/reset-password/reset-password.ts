import fs from "fs";
import ejs from "ejs";
import moment from "moment";

class ResetPasswordTemplate {
  public passwordResetTemplate(username: string) {
    return ejs.render(
      fs.readFileSync(__dirname + "/reset-password.ejs", "utf8"),
      {
        username: "",
        email: username,
        image_url: "",
        date: moment().format("DD/MM/YY HH:mm:ss"),
      }
    );
  }
}

export const resetPasswordTemplate: ResetPasswordTemplate =
  new ResetPasswordTemplate();
