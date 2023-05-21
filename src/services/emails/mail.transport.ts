import Logger from "bunyan";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import sendGridMail from "@sendgrid/mail";
import createLoggerCustom from "../../utils/logger";
import { BadRequestError } from "../../utils/error/error-handler";

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = createLoggerCustom("mail.transport");
const key: any = process.env.SENDGRID_API_KEY;
const sEmail: any = process.env.SENDER_EMAIL;
const sPass: any = process.env.SENDER_PASSWORD;
sendGridMail.setApiKey(key);

class MailTransport {
  public async sendEmail(
    rEmail: string,
    subject: string,
    body: string
  ): Promise<void> {
    if (process.env.ENV === "dev") {
      console.log("dev");
      return this.devEmailSender(rEmail, subject, body);
    }
    console.log("prod");
    return await this.prodEmailSender(rEmail, subject, body);
  }

  private async devEmailSender(
    rEmail: string,
    subject: string,
    body: string
  ): Promise<void> {
    // create reusable transporter object using the default SMTP transport
    const transporter: Mail = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: sEmail,
        pass: sPass,
      },
    });

    const mailOptions: IMailOptions = {
      from: `FavFleeks App <${sEmail}>`,
      to: `FavFleeks App <${rEmail}>`,
      subject,
      html: body,
    };

    try {
      await transporter.sendMail(mailOptions);
      log.info("production email sent");
    } catch (error) {
      log.error("error sending email" + error);
      throw new BadRequestError("Error sending email");
    }
  }

  private async prodEmailSender(
    rEmail: string,
    subject: string,
    body: string
  ): Promise<void> {
    const mailOptions: IMailOptions = {
      from: `FavFleeks App <${sEmail}>`,
      to: `FavFleeks App <${rEmail}>`,
      subject,
      html: body,
    };

    try {
      await sendGridMail.send(mailOptions);
      log.info("production email sent");
    } catch (error) {
      log.error("error sending email" + error);
      throw new BadRequestError("Error sending email");
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
