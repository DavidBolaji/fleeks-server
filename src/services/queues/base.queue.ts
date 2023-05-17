import Queue, { Job } from "bull";
import Logger from "bunyan";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import createLoggerCustom from "src/utils/logger";

{/* prettier-ignore */}
// type IBaseJobData = IAuthJob;

let bullAdapters: BullAdapter[] = [];

export let serverAdapter: any = ExpressAdapter;

export abstract class BaseQueue {
  queue: Queue.Queue;
  log: Logger;

  constructor(queueName: string) {
    const redis: any = process.env.REDIS_HOST;
    this.queue = new Queue(queueName, redis);
    bullAdapters.push(new BullAdapter(this.queue));
    bullAdapters = [...new Set(bullAdapters)];
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/queues");

    createBullBoard({
      queues: bullAdapters,
      serverAdapter,
    });

    this.log = createLoggerCustom(queueName + "Queue");

    this.queue.on("completed", (job: Job) => {
      job.remove();
      this.log.info("Queue completed");
    });

    this.queue.on("global:completed", (jobId: string) => {
      this.log.info(`job id: ${jobId} completed`);
    });

    this.queue.on("global:stalled", (jobId: string) => {
      this.log.info(`job id: ${jobId} is stalled`);
    });
  }

  protected addJob(name: string, data: any): void {
    this.queue.add(name, data, {
      attempts: 2,
      backoff: { type: "fixed", delay: 10000 },
    });
  }

  protected processJob(
    name: string,
    concurrency: number,
    cb: Queue.ProcessCallbackFunction<void>
  ): void {
    this.queue.process(name, concurrency, cb);
  }
}
