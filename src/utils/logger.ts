import bunyan from "bunyan";
import BunyanFormat from "bunyan-format";

const createLoggerCustom = (name: string) => {
  const logger = bunyan.createLogger({
    name,
    level: "debug",
    streams: [
      {
        level: "debug",
        stream: BunyanFormat({
          outputMode: "short",
          color: true,
          levelInString: true,
        }),
      },
    ],
  });

  return logger;
};

export default createLoggerCustom;
