import { format, transports, createLogger } from "winston";
import "winston-daily-rotate-file";

const { combine, json, colorize, simple } = format;

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

const logger = createLogger({
  level: "silly",
  format: json(),
  transports: [
    fileRotateTransport,
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(colorize(), simple()),
    })
  );
}

export default logger;
