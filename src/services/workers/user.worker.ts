import { DoneCallback, Job } from "bull";
import Logger from "bunyan";
import { userService } from "../../features/auth/services/user.services";
import createLoggerCustom from "../../utils/logger";

const log: Logger = createLoggerCustom("worker");

class UserWorker {
  async addUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      await userService.createUser(value);
      job.progress(100);
      done(null, value);
    } catch (err) {
      log.error(err);
      done(err as Error);
    }
  }
}

export const userWorker: UserWorker = new UserWorker();
