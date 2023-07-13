const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const config = require("../config/default.json");
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);
const transport = new DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  prepend: true,
  // level: config.get("logConfig.logLevel"),
});
transport.on("rotate", function (oldFilename, newFilename) {
  // call function like upload to s3 or on cloud
});
const logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      level: "info",
    }),
  ],
});
module.exports = logger;