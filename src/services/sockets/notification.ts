import Logger from "bunyan";
import { Server, Socket } from "socket.io";
import createLoggerCustom from "src/utils/logger";

let socIOObjNotHan: Server;

export class SocketIONotificationHandler {
  private io: Server;
  private log: Logger;

  constructor(io: Server) {
    this.io = io;
    socIOObjNotHan = io;
    this.log = createLoggerCustom("Notification.ts");
  }

  public listen(): void {
    this.io.on("connection", (socket: Socket) => {
      this.log.info("Notification socket handler");
    });
  }
}
