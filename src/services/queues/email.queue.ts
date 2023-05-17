import { emailWorker } from "../workers/email.worker";
import { BaseQueue } from "./base.queue";

class EmailQueue extends BaseQueue {
  constructor() {
    super("email");
    this.processJob(
      "forgotPasswordEmail",
      2,
      emailWorker.sendForgotPasswordEmail
    );
    this.processJob(
      "resetPasswordEmail",
      2,
      emailWorker.sendResetPasswordEmail
    );
  }

  public addEmailJob(name: string, data: any): void {
    this.addJob(name, data);
  }
}

export const emailQueue: EmailQueue = new EmailQueue();
