import pino from "pino";

const logger = pino({
  level: "info",
  base: null,
  prettyPrint: true,
  timestamp: () => {
    return `, "time":"${new Date(Date.now()).toLocaleString()}"`;
  }
});

export default logger;
