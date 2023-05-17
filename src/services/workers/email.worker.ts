import { DoneCallback, Job } from "bull";
import Logger from "bunyan";

import createLoggerCustom from "src/utils/logger";
import { mailTransport } from "../emails/mail.transport";
const log: Logger = createLoggerCustom("worker");

class EmailWorker {
  async sendForgotPasswordEmail(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { rEmail, subject, body } = job.data;
      await mailTransport.sendEmail(rEmail, subject, body);
      //   await userService.createUser(value);
      job.progress(100);
      done(null, { rEmail, subject, body });
    } catch (err) {
      log.error(err);
      done(err as Error);
    }
  }

  async sendResetPasswordEmail(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { rEmail, subject, body } = job.data;
      await mailTransport.sendEmail(rEmail, subject, body);
      //   await userService.createUser(value);
      job.progress(100);
      done(null, { rEmail, subject, body });
    } catch (err) {
      log.error(err);
      done(err as Error);
    }
  }
}

export const emailWorker: EmailWorker = new EmailWorker();
